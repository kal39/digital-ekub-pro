package models

import "time"

// EkubMember represents a participant in the rotating savings group
type EkubMember struct {
	ID               int       `json:"id"`
	Name             string    `json:"name"`
	ContributionPool string    `json:"contributionPool"` // e.g., "Sunday Pool"
	Balance          float64   `json:"balance"`          // In Birr
	TrustScore       float64   `json:"trustScore"`       // Data-driven metric based on payment history
	NextPaymentDate  time.Time `json:"nextPaymentDate"`
	IsActive         bool      `json:"isActive"`
}

// EmergencyFreezePayload captures the incoming request details for account protection
type EmergencyFreezePayload struct {
	MemberID int    `json:"memberId"`
	Reason   string `json:"reason"`
}