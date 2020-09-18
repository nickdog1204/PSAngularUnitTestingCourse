import {MessageService} from './message.service';

describe('MessageService', () => {
  let SUT: MessageService;

  beforeEach(() => {
    SUT = new MessageService();
  });

  it('should have 0 messages to start with', () => {
    expect(SUT.messages.length).toBe(0);
  });

  it('should have 1 message when add is called', () => {
    SUT.add('message1');

    expect(SUT.messages.length).toBe(1);
  });

  it('should contain the same message as added using "add"', () => {
    SUT.add('message1');

    expect(SUT.messages).toEqual(['message1']);
  });

  it('should remove all messages when "clear" is called', () => {
    SUT.add('message1');

    SUT.clear();

    expect(SUT.messages.length).toBe(0);
  });
});
