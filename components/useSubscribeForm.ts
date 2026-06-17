"use client";

import { useActionState, useOptimistic, useEffect, useRef } from "react";
import { subscribeAction, type SubscribeState } from "@/app/actions/subscribe";

export function useSubscribeForm(successMessage = "You're in! We'll keep you posted.") {
  const formRef = useRef<HTMLFormElement>(null);
  const initial: SubscribeState = { status: "idle", message: "" };

  const [state, formAction, isPending] = useActionState(
    (prev: SubscribeState, fd: FormData) => subscribeAction(prev, fd, successMessage),
    initial,
  );

  const [optimistic, addOptimistic] = useOptimistic(
    state,
    (_cur: SubscribeState, next: SubscribeState["status"]): SubscribeState => ({
      status: next,
      message: successMessage,
    }),
  );

  function action(formData: FormData) {
    addOptimistic("success");
    return formAction(formData);
  }

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  return {
    formRef,
    action,
    status: optimistic.status,
    message: optimistic.message,
    isPending,
  };
}
