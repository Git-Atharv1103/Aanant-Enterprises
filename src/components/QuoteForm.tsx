import React from 'react';
import { CustomProductForm } from './CustomProductForm';
import type { ProductItem } from '../types';

interface QuoteFormProps {
  initialProduct?: ProductItem | null;
  onSuccess?: (referenceId: string) => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = (props) => {
  return <CustomProductForm {...props} />;
};
