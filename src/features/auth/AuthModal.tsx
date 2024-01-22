'us';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useState } from 'react';

import RequestForgotPasswordForm from './forgot-password/RequestForgotPasswordForm';
import SignInForm from './signin/SignInForm';
import SignUpForm from './signup/SignUpForm';

interface Props {
  isOpen: boolean;
  onOpenChange(): void;
  onClose(): void;
}

export default function AuthModal({ isOpen, onOpenChange, onClose }: Props) {
  const [authState, setAuthState] = useState<
    'signin' | 'signup' | 'forgot-password'
  >('signin');

  const handleIsSignUp = (value: 'signin' | 'signup' | 'forgot-password') => {
    setAuthState(value);
  };

  let authForm;
  let authTitle = '';

  switch (authState) {
    case 'signin':
      authForm = (
        <SignInForm
          handleAuthState={handleIsSignUp}
          onClose={onClose}
        />
      );
      authTitle = 'Sign In';
      break;
    case 'signup':
      authForm = (
        <SignUpForm
          handleAuthState={handleIsSignUp}
          onClose={onClose}
        />
      );
      authTitle = 'Sign Up';

      break;
    case 'forgot-password':
      authForm = (
        <RequestForgotPasswordForm
          handleAuthState={handleIsSignUp}
          onClose={onClose}
        />
      );
      authTitle = 'Forgot Password';

      break;

    default:
      authForm = (
        <SignInForm
          handleAuthState={handleIsSignUp}
          onClose={onClose}
        />
      );
      authTitle = 'Sign In';

      break;
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => handleIsSignUp('signin')}
      size="lg"
    >
      <ModalContent className="py-4">
        <ModalHeader className="flex items-center justify-center">
          <span className="text-3xl font-semibold text-neutral-800">
            {authTitle}
          </span>
        </ModalHeader>
        <ModalBody>{authForm}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
