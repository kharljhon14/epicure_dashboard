'us';

import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';

import SignInForm from './signin/SignInForm';
import SignUpForm from './signup/SignUpForm';

interface Props {
  isOpen: boolean;
  onOpenChange(): void;
  onClose(): void;
}

export default function AuthModal({ isOpen, onOpenChange, onClose }: Props) {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleIsSignUp = (value: boolean) => {
    setIsSignUp(value);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => handleIsSignUp(false)}
      size="lg"
    >
      <ModalContent className="py-4">
        <ModalHeader className="flex flex-col items-center justify-center space-y-2">
          <Image
            width={94}
            height={94}
            src="/logo.jpg"
            alt="Epicure logo"
            style={{
              height: 'auto',
              width: 'auto',
              objectFit: 'cover',
              borderRadius: '100%',
              objectPosition: 'center',
            }}
          />
          <span className="text-3xl font-semibold text-neutral-800">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </span>
        </ModalHeader>
        <ModalBody>
          {isSignUp ? (
            <SignUpForm
              handlIsSignUp={handleIsSignUp}
              onClose={onClose}
            />
          ) : (
            <SignInForm
              handlIsSignUp={handleIsSignUp}
              onClose={onClose}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
