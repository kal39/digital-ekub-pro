// services/projectService.ts

export const updateProject = async (id: number, data: { title: string; description: string }) => {
  try {
    const response = await fetch(`http://localhost:8080/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      // Ensure the ID is included in the payload if the Go struct expects it
      body: JSON.stringify({ id, ...data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Update failed');
    }

    return await response.json();
  } catch (error) {
    console.error("Frontend Error:", error);
    throw error;
  }
};