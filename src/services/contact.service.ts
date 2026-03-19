import { delay } from '@/lib/mock-data';

export interface ContactAdminRequest {
  subject: string;
  message: string;
}

export interface ContactVendorRequest {
  vendorId: string;
  name: string;
  email: string;
  message: string;
}

export const contactService = {
  async contactAdmin(data: ContactAdminRequest): Promise<{ success: boolean; message: string }> {
    await delay(500);
    console.log('Contact admin:', data);
    return { success: true, message: 'Message sent successfully' };
  },

  async contactVendor(data: ContactVendorRequest): Promise<{ success: boolean; message: string }> {
    await delay(500);
    console.log('Contact vendor:', data);
    return { success: true, message: 'Message sent to vendor' };
  },
};
