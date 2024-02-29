import type { FormEvent } from 'react';
import { useState, useEffect } from "react";

import type { ActionError, ActionFunction } from "@/lib/actions";

export type UseFormStateResult = [SubmissionState, (event: FormEvent<HTMLFormElement>) => Promise<void>];

export interface SubmissionState {
  loading: boolean;
  error: ActionError | null;
}

export function useIsClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);
  return isClient;
}

export function useFormState(action: ActionFunction) : UseFormStateResult {
  const [state, setState] = useState({loading: false, error: null});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setState({loading: true, error: false});
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    console.log("formData:", [...formData.entries()]);
    const result = await action(formData);
    if (result?.isError) {
      setState({loading: false, error: result});
    } else {
      form.reset();
      setState({ loading: false, error: null})
    }
  }

  return [state, handleSubmit]
}