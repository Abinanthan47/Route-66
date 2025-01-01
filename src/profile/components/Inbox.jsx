/* eslint-disable no-unsafe-optional-chaining */
import { useUser } from '@clerk/clerk-react';
import { SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { useEffect, useState } from 'react';

function Inbox() {
  const { user } = useUser();
  const [userId, setUserId] = useState('');
  const [channelUrl, setChannelUrl] = useState('');

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      const id = user.primaryEmailAddress.emailAddress.split('@')[0];
      setUserId(id);
    }
  }, [user]);

  const onChannelSelect = (channel) => {
    if (channel) {
      setChannelUrl(channel.url);
    }
  };

  return (
    <div className="h-[calc(100vh-200px)] w-full">
      {userId && (
        <SendBirdProvider
          appId={import.meta.env.VITE_SENDBIRD_APP_ID}
          userId={userId}
          nickname={user?.fullName}
          profileUrl={user?.imageUrl}
          theme="light"
          allowProfileEdit={true}
       
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 h-full border rounded-lg overflow-hidden">
            <div className="border p-5 shadow-lg">
              <GroupChannelList
                onChannelSelect={onChannelSelect}
                channelListQuery={{
                  includeEmpty: true,
                  limit: 20,
                  order: 'latest_last_message'
                }}
                renderChannelPreview={({ channel }) => (
                  <div className="px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">{channel.name || 'Unnamed Channel'}</div>
                    <div className="text-sm text-gray-500">
                      {channel.lastMessage?.message || 'No messages yet'}
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="md:col-span-2 shadow-lg">
              {channelUrl ? (
                <GroupChannel
                  channelUrl={channelUrl}
                  onChatHeaderActionClick={() => { }}
                  showSearchIcon={true}
                  onBackClick={() => setChannelUrl('')}
                  renderMessageInput={() => (
                    <div className="p-4 border-t">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  )}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  Select a conversation to start messaging
                </div>
              )}
            </div>
          </div>
        </SendBirdProvider>
      )}
    </div>
  );
}

export default Inbox;