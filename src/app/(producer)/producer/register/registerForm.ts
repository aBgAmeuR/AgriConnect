import * as z from 'zod';
export const step1Schema = z.object({
    name: z.string().regex(/^[a-zA-Z]+$/, {
      message: 'Veuillez entrer un nom valide.',
    })
  });

export const step2Schema = z.object({
    adresse: z.string().regex(/^[a-zA-Z]+$/, {
      message: 'Veuillez entrer une adresse valide.',
    }),
    numTel: z.string().regex(/^[0-9]+$/, {
      message: 'Veuillez entrer un numéro de téléphone valide.',
    })
  });

export const step3Schema = z.object({
    categorie: z.string().regex(/^[a-zA-Z]+$/, {
      message: 'Veuillez entrer une catégorie valide.',
    }),
    description: z.string().regex(/^[a-zA-Z]+$/, {
      message: 'Veuillez entrer une description valide.',
    })
  });

export const step4Schema = z.object({
    image: z.string().regex(/^[a-zA-Z]+$/, {
      message: 'Veuillez entrer une image valide.',
    }),
    moyenDePayement: z.string().regex(/^[a-zA-Z]+$/, {
      message: 'Veuillez sélectionner un moyen de payement.',
    })
  });



export type step1Type = z.infer<typeof step1Schema>;
export type step2Type = z.infer<typeof step2Schema>;
export type step3Type = z.infer<typeof step3Schema>;
export type step4Type = z.infer<typeof step4Schema>;

export type stepsType = {
    step1Type: typeof step1Schema,
    step2Type: typeof step2Schema,
    step3Type: typeof step3Schema,
    step4Type: typeof step4Schema
}
