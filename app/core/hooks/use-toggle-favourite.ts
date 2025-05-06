import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '../api/client';
import { Property } from '../types';
type ToggleFavouriteProps = {
  propertyId: string;
  currentFavouriteStatus: boolean;
};

export const useToggleFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ propertyId, currentFavouriteStatus }: ToggleFavouriteProps) => {
      console.log('🚀 ~ mutationFn: ~ propertyId:', propertyId);
      const response = await client.post(`/favorites/${propertyId}`);
      console.log('🚀 ~ mutationFn: ~ response:', response.data);

      return response.data;
    },
    onMutate: async ({ propertyId, currentFavouriteStatus }: ToggleFavouriteProps) => {
      await queryClient.cancelQueries({
        queryKey: ['properties'],
      });

      const previousProperties = queryClient.getQueryData<Property[]>(['properties']);

      queryClient.setQueryData<Property[]>(['properties'], (old) => {
        if (!old) return [];

        return old.map((property) => {
          if (property.id === propertyId) {
            return { ...property, is_favorite: !currentFavouriteStatus };
          }

          return property;
        });
      });

      return { previousProperties };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favourites'] });
    },
    onError: (error, variables, context) => {
      if (context?.previousProperties) {
        queryClient.setQueryData(['properties'], context?.previousProperties);
      }
      console.error(error);
      console.log(variables);
    },
  });
};
