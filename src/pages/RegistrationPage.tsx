import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { UserCheck } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
}

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [serverError, setServerError] = useState<string | null>(null); // State for server error messages

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:4000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          // Successful registration
          console.log('Registration successful:', data);
          localStorage.setItem('userId', data.userId); // Save user ID for future use
          setServerError(null); // Clear previous errors
          navigate('/questions');
        } else {
          // Registration failed
          console.log('Registration failed:', data.error);
          setServerError(data.error); // Display the server error
        }
      } catch (error) {
        console.error('Error:', error);
        setServerError('An unexpected error occurred. Please try again.'); // Handle unexpected errors
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <UserCheck size={32} className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Registration
        </h2>

        {serverError && ( // Render the server error if it exists
          <div className="text-red-600 text-center mb-4">{serverError}</div>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
          />

          <Button type="submit" className="w-full mt-4">
            Continue to Quiz
          </Button>
        </form>
      </div>
    </div>
  );
};
