import { utils } from 'near-api-js';
import type { Wallet } from './near-wallet';
import type { Message } from './components/ui/Messages';
import { PostedMessage } from './model';

interface PostFeedConfig {
  contractId: string;
  walletToUse: Wallet;
}

class PostFeed {
  contractId: string;
  wallet: Wallet;

  constructor({ contractId, walletToUse }: PostFeedConfig) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async getMessages(): Promise<PostedMessage[]> {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_messages',
    });
  }

  async addMessage(
    message: string,
    topic: string,
    donation: string,
  ): Promise<Message> {
    const deposit = utils.format.parseNearAmount(donation) || '0';
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'add_message',
      args: { text: message, topic: topic, donation: donation },
      deposit,
    });
  }
}

export { PostFeed };