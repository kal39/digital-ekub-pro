package security

import (
	"errors"
	"fmt"
	"sync"
	"time"
)

// Constants defining security thresholds
const (
	MandatoryEscrowBuffer = 5000.0 // Minimum 5,000 ETB hold per active slot
	MaxActiveSlotsPerUser  = 3      // Anti-Sybil concentration limit
	SystemFreezeThreshold = 0.40   // 40% aggregate pool default freeze rule
	SlashingPenalty       = 50     // Aquam score degradation points
)

// Structural Types
type UserProfile struct {
	ID             string
	FaydaLinked    bool
	AquamScore     int
	EscrowBalance  float64
	ActiveSlots    int
}

type EkubPool struct {
	ID             string
	TotalSlots     int
	ActiveSlots    int
	DefaultedSlots int
	IsFrozen       bool
}

type MultiSigProposal struct {
	ID          string
	Action      string
	TargetID    string
	ApprovedBy  map[string]bool
	IsExecuted  bool
}

type AuditLog struct {
	Timestamp time.Time
	Action    string
	Details   string
}

type SecurityManager struct {
	mu         sync.RWMutex
	Users      map[string]*UserProfile
	Pools      map[string]*EkubPool
	Proposals  map[string]*MultiSigProposal
	AuditTrail []AuditLog
	Admins     map[string]bool // Authorized Multi-Sig Admin keys
}

// NewSecurityManager initializes the secure state container
func NewSecurityManager(admins []string) *SecurityManager {
	adminMap := make(map[string]bool)
	for _, admin := range admins {
		adminMap[admin] = true
	}
	return &SecurityManager{
		Users:     make(map[string]*UserProfile),
		Pools:     make(map[string]*EkubPool),
		Proposals: make(map[string]*MultiSigProposal),
		Admins:    adminMap,
	}
}

// LogEvent appends an immutable record to the audit stream
func (sm *SecurityManager) logEvent(action, details string) {
	log := AuditLog{
		Timestamp: time.Now(),
		Action:    action,
		Details:   details,
	}
	sm.AuditTrail = append(sm.AuditTrail, log)
	fmt.Printf("[AUDIT LOG] %s | Action: %s | %s\n", log.Timestamp.Format(time.RFC3339), log.Action, log.Details)
}

// 1. IDENTITY & ANTI-SYBIL GATEWAYS

// RegisterUser enforces Biometric FAYDA hard-linking
func (sm *SecurityManager) RegisterUser(id string, faydaVerified bool) error {
	sm.mu.Lock()
	defer sm.mu.Unlock()

	if !faydaVerified {
		return errors.New("registration rejected: biometric FAYDA validation required")
	}

	sm.Users[id] = &UserProfile{
		ID:             id,
		FaydaLinked:    true,
		AquamScore:     500, // Baseline financial trust score
		EscrowBalance:  0.0,
		ActiveSlots:    0,
	}

	sm.logEvent("USER_REGISTRATION", fmt.Sprintf("User %s successfully verified via FAYDA.", id))
	return nil
}

// JoinPool checks concentration limits and escrow safety cushions
func (sm *SecurityManager) JoinPool(userID string, poolID string) error {
	sm.mu.Lock()
	defer sm.mu.Unlock()

	user, userExists := sm.Users[userID]
	pool, poolExists := sm.Pools[poolID]

	if !userExists || !poolExists {
		return errors.New("entity not found")
	}
	if pool.IsFrozen {
		return errors.New("pool interaction blocked: pool is under emergency freeze")
	}
	if user.ActiveSlots >= MaxActiveSlotsPerUser {
		return fmt.Errorf("anti-sybil limit reached: maximum of %d slots allowed per user", MaxActiveSlotsPerUser)
	}
	if user.EscrowBalance < MandatoryEscrowBuffer {
		return fmt.Errorf("insufficient escrow: must lock a minimum of %.2f ETB cushion hold", MandatoryEscrowBuffer)
	}

	user.ActiveSlots++
	pool.ActiveSlots++
	
	sm.logEvent("POOL_JOIN", fmt.Sprintf("User %s occupied slot in Pool %s. Escrow locked.", userID, poolID))
	return nil
}

// 2. CAPITAL SAFEGUARDS & SLASHING MECHANISMS

// HandlePaymentFailure executes dynamic deficit slashing and liquidation pulls
func (sm *SecurityManager) HandlePaymentFailure(userID string, poolID string, owedAmount float64) error {
	sm.mu.Lock()
	defer sm.mu.Unlock()

	user, userExists := sm.Users[userID]
	pool, poolExists := sm.Pools[poolID]

	if !userExists || !poolExists {
		return errors.New("invalid transaction references")
	}

	// 1. Apply Dynamic Deficit Slashing to Aquam Score
	user.AquamScore -= SlashingPenalty
	if user.AquamScore < 0 {
		user.AquamScore = 0
	}

	// 2. Enforce Asset Liquidation from Escrow Reserve Cushion
	if user.EscrowBalance < owedAmount {
		// Liquidate whatever is left, pool takes the hit, system indexes recalculate
		owedAmount = user.EscrowBalance
	}
	user.EscrowBalance -= owedAmount
	pool.DefaultedSlots++

	sm.logEvent("DEFICIT_SLASHING", fmt.Sprintf("User %s defaulted in Pool %s. Aquam dropped by %d. Liquidated %.2f ETB from escrow.", userID, poolID, SlashingPenalty, owedAmount))

	// 3. Systemic Liquidation Threshold Check
	if float64(pool.DefaultedSlots)/float64(pool.ActiveSlots) >= SystemFreezeThreshold {
		pool.IsFrozen = true
		sm.logEvent("EMERGENCY_FREEZE", fmt.Sprintf("Pool %s has crossed the systemic risk threshold (%d%% defaults). Pool frozen safely.", poolID, int(SystemFreezeThreshold*100)))
	}

	return nil
}

// DepositEscrow allows users to top up their safety cushions
func (sm *SecurityManager) DepositEscrow(userID string, amount float64) error {
	sm.mu.Lock()
	defer sm.mu.Unlock()

	user, exists := sm.Users[userID]
	if !exists {
		return errors.New("user not found")
	}

	user.EscrowBalance += amount
	sm.logEvent("ESCROW_DEPOSIT", fmt.Sprintf("User %s deposited %.2f ETB to escrow cushion.", userID, amount))
	return nil
}

// 3. MULTI-SIG CONSENSUS INTERVENTION

// ProposeOverride initiates a critical override event requiring governance approval
func (sm *SecurityManager) ProposeOverride(proposalID string, action string, targetID string, adminKey string) error {
	sm.mu.Lock()
	defer sm.mu.Unlock()

	if !sm.Admins[adminKey] {
		return errors.New("unauthorized admin signature attempt")
	}

	sm.Proposals[proposalID] = &MultiSigProposal{
		ID:         proposalID,
		Action:     action,
		TargetID:   targetID,
		ApprovedBy: map[string]bool{adminKey: true},
		IsExecuted: false,
	}

	sm.logEvent("PROPOSAL_CREATED", fmt.Sprintf("Admin %s proposed action '%s' on target %s.", adminKey, action, targetID))
	return nil
}

// ApproveOverride collects consensus signatures and executes when criteria met (2 distinct admins)
func (sm *SecurityManager) ApproveOverride(proposalID string, adminKey string) error {
	sm.mu.Lock()
	defer sm.mu.Unlock()

	if !sm.Admins[adminKey] {
		return errors.New("unauthorized admin signature attempt")
	}

	proposal, exists := sm.Proposals[proposalID]
	if !exists {
		return errors.New("proposal context missing")
	}
	if proposal.IsExecuted {
		return errors.New("action already executed")
	}

	// Register unique signature
	proposal.ApprovedBy[adminKey] = true
	sm.logEvent("PROPOSAL_SIGNED", fmt.Sprintf("Admin %s signed proposal %s.", adminKey, proposal.ID))

	// Dual-control check: Requires minimum 2 unique admin approvals
	if len(proposal.ApprovedBy) >= 2 {
		return sm.executeOverride(proposal)
	}

	return nil
}

// internal un-exported execution engine (must be called within an active lock)
func (sm *SecurityManager) executeOverride(p *MultiSigProposal) error {
	p.IsExecuted = true

	switch p.Action {
	case "UNFREEZE_POOL":
		pool, exists := sm.Pools[p.TargetID]
		if !exists {
			return errors.New("target pool missing")
		}
		pool.IsFrozen = false
		pool.DefaultedSlots = 0 // Reset metric on emergency rescue
		sm.logEvent("GOVERNANCE_EXECUTION", fmt.Sprintf("Pool %s has been manually unfrozen via Multi-Sig consensus.", p.TargetID))
	default:
		return fmt.Errorf("unknown intervention routine: %s", p.Action)
	}

	return nil
}