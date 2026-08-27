/* Registry for the coded product mocks, so every surface that shows one
   (desktop reveal, mobile ticker, highlights reel) resolves it the same way. */
import CustomersMock from '../CustomersMock';
import DocumentsMock from '../DocumentsMock';
import ImportCalcMock from '../ImportCalcMock';
import WebsiteMock from './WebsiteMock';
import WhatsAppMock from './WhatsAppMock';
import AppMock from './AppMock';
import AskAgntMock from './AskAgntMock';
import HeroDashboardMock from '../../HeroDashboardMock';

export const MOCKS = {
  website: WebsiteMock,
  dashboard: HeroDashboardMock,
  whatsapp: WhatsAppMock,
  app: AppMock,
  ask: AskAgntMock,
  customers: CustomersMock,
  documents: DocumentsMock,
  import: ImportCalcMock,
};

/* Portrait devices need a different fit from the landscape screens. */
const PHONES = new Set(['whatsapp', 'app', 'ask']);

export function isPhoneMock(name) {
  return PHONES.has(name);
}
