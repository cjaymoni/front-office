export interface IChamber {
  name: string;
  description: string;
  primary_phone: string;
  secondary_phone: string;
  primary_email: string;
  secondary_email: string;
  website: string;
  linkedin: string;
  location: string;
  address: {
    line_one: string;
    line_two: string;
    street: string;
    city: string;
    province: string;
    region: string;
    country: string;
    post_code: string;
  };
}
