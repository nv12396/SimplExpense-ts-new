export type SettingsDTO = {
  name: string;
  email: string;
  currency: string;
};

export type UpdateSettingsDTO = {
  id: string;
  data: SettingsDTO;
};
