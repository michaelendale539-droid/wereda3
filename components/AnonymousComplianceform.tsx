// components/AnonymousComplianceForm.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

// Define a union type for submission status
type SubmitStatus = 'success' | 'error';

// Define the expected shape of the form data payload
interface CompliancePayload {
    issueType: string;
    details: string;
    // Add other fields as necessary
}

export default function AnonymousComplianceForm() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null); 

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    // Use the event target to access the form elements
    const form = event.currentTarget;
    
    // Safely extract form data using FormData
    const formData = new FormData(form);
    const payload: CompliancePayload = {
        issueType: formData.get('issueType') as string,
        details: formData.get('details') as string,
    };

    // --- IMPORTANT: Replace with your secure API endpoint or Server Action ---
    console.log("Submitting anonymous compliance report:", payload);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      
      // Simulate a successful response
      setSubmitStatus('success');
      form.reset(); // Clear form on success
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="issueType" className="block text-sm font-medium text-gray-700">
          Type of Issue
        </label>
        <select 
          id="issueType" 
          name="issueType" 
          required 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-700 sm:text-sm p-2 border"
        >
          <option value="">-- Select --</option>
          <option value="misconduct">Misconduct</option>
          <option value="corruption">Corruption/Fraud</option>
          <option value="nepotism">Nepotism</option>
          <option value="other">Other Ethical Concern</option>
        </select>
      </div>

      <div>
        <label htmlFor="details" className="block text-sm font-medium text-gray-700">
          Details of the Report
        </label>
        <textarea
          id="details"
          name="details"
          rows={6} // Using TS number type
          required
          placeholder="Please provide as much detail as possible, including date, location (e.g., specific sub-area of Woreda 3), and involved parties (if known, but do not compromise your anonymity)."
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-blue-500 sm:text-sm p-2 border"
        />
      </div>

      {submitStatus === 'success' && (
        <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
          ✅ Report successfully submitted. Thank you for your contribution to good governance.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          ❌ Submission failed. Please try again later.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Report Anonymously'}
      </button>
    </form>
  );
}