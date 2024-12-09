import React, { useState } from 'react';
import './Chat.css'



const Chat = () => {
  const [activeFriendId, setActiveFriendId] = useState(1);
  const [inputText, setInputText] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const togglePanel = () => setIsOpen(!isOpen);

  const [messages, setMessages] = useState({
    1: [
      { id: 1, text: "What's up? Having a good weekend?", sender: 'other' },
      { id: 2, text: '😊', sender: 'me' },
      { id: 3, text: 'Good so far! Now I just have to convince myself to mow the lawn...', sender: 'other' },
    ],
    2: [
      { id: 5, text: 'Hey! Are we still on for dinner?', sender: 'other' },
      { id: 6, text: 'Absolutely! Looking forward to it.', sender: 'me' },
    ],
    3: [
      { id: 7, text: 'Hello there!', sender: 'other' },
      { id: 8, text: 'Hi! How have you been?', sender: 'me' },
    ],
  });

  const friends = [
    { id: 1, name: 'Olenna Mason', status: 'Yeeeah', img: 'https://via.placeholder.com/40' },
    { id: 2, name: 'Luke Mendoza', status: 'You: Heading to the p...', img: 'https://via.placeholder.com/40' },
    { id: 3, name: 'Henri Rousseau', status: 'You: hello!', img: 'https://via.placeholder.com/40' },
    { id: 4, name: 'Olenna Mason', status: 'Yeeeah', img: 'https://via.placeholder.com/40' },
    { id: 5, name: 'Luke Mendoza', status: 'You: Heading to the p...', img: 'https://via.placeholder.com/40' },
    { id: 6, name: 'Henri Rousseau', status: 'You: hello!', img: 'https://via.placeholder.com/40' },
    { id: 7, name: 'Olenna Mason', status: 'Yeeeah', img: 'https://via.placeholder.com/40' },
    { id: 8, name: 'Luke Mendoza', status: 'You: Heading to the p...', img: 'https://via.placeholder.com/40' },
    { id: 9, name: 'Henri Rousseau', status: 'You: hello!', img: 'https://via.placeholder.com/40' },
    { id: 10, name: 'Olenna Mason', status: 'Yeeeah', img: 'https://via.placeholder.com/40' },
    { id: 11, name: 'Luke Mendoza', status: 'You: Heading to the p...', img: 'https://via.placeholder.com/40' },
    { id: 12, name: 'Henri Rousseau', status: 'You: hello!', img: 'https://via.placeholder.com/40' },
  ];

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { id: Date.now(), text: inputText, sender: 'me' };
      
      setMessages(prevMessages => ({
        ...prevMessages,
        [activeFriendId]: [...(prevMessages[activeFriendId] || []), newMessage]
      }));

      setInputText('');
    }
  };

  const handleAddEmoji = () => {
    setInputText(inputText + '😊');
  };

  const handleFriendClick = (id) => {
    setActiveFriendId(id);
    setInputText('');
  };

  const activeFriend = friends.find(friend => friend.id === activeFriendId);

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
    }}>

      {/* Left Sidebar Mobile view */}
      <div className={`sidepanel ${isOpen ? 'open' : ''}`} style={{
        height: '85%', // Set the desired height of the scrollable area
        overflowY: 'auto', // Enable vertical scrolling
        // Optional border for visual separation
      }}>
        <span><div className='leftContent1'>
          <input
            type="text"
            placeholder="Search Messenger"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '15px',
              border: '1px solid #ccc',
              marginBottom: '10px',
            }}
          />
          <div style={{
            flex: '1', display: 'flex', flexDirection: 'column',

          }} >
            {friends.map((friend) => (
              <div
                key={friend.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between', // Evenly distribute space
                  padding: '10px',
                  cursor: 'pointer',
                  marginRight: '1px',
                  borderBottom: '1px solid #ddd', // Optional for separating items visually
                }}
                onClick={() => handleFriendClick(friend.id)} // Set active friend when clicked
              >
                <img src={friend.img}
                  alt="profile"
                  style={{
                    borderRadius: '50%',
                    marginRight: '10px',
                    width: '40px', // Consistent image size
                    height: '40px'
                  }} />
                <div style={{ flexGrow: 1, marginLeft: '10px' }}>
                  <p style={{ margin: '0', fontWeight: 'bold' }}>{friend.name}</p>
                  <p style={{ margin: '0', color: '#888' }}>{friend.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div></span>
        <div className="line"></div>
        <div className="circle" onClick={togglePanel}>
          {/* <i className={`fa fa-chevron-${isOpen ? 'left' : 'right'}`} aria-hidden="true"></i> */}
          <i className={`fa fa-chevron-${isOpen ? 'left' : 'right'}`} aria-hidden="true"></i>
        </div>
      </div>
      {/* Left Sidebar Mobile view */}



      {/* Left Sidebar */}
      <div className='leftContent'>
        <h3 style={{ margin: '0', padding: '10px', color: '#555' }}>Messenger</h3>
        <input
          type="text"
          placeholder="Search Messenger"
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '15px',
            border: '1px solid #ccc',
            marginBottom: '10px',
          }}
        />
        <div>
          {friends.map((friend) => (
            <div
              key={friend.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
                cursor: 'pointer',
              }}
              onClick={() => handleFriendClick(friend.id)} // Set active friend when clicked
            >
              <img src={friend.img} alt="profile" style={{ borderRadius: '50%', marginRight: '10px' }} />
              <div>
                <p style={{ margin: '0', fontWeight: 'bold' }}>{friend.name}</p>
                <p style={{ margin: '0', color: '#888' }}>{friend.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================================================   Chat area */}
      <div style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Chat header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          borderBottom: '1px solid #ddd',
        }}>
          <img
            src={activeFriend.img}
            alt="profile"
            style={{ borderRadius: '50%', marginRight: '10px' }}
          />
          <div>
            <h4 style={{ margin: '0' }}>{activeFriend.name}</h4>
            <p style={{ margin: '0', color: '#888' }}>{activeFriend.status}</p>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: '1',
          padding: '10px',
          overflowY: 'scroll',
        }}>
          {(messages[activeFriendId] || []).map((message) => (
            <div
              key={message.id}
              style={{
                marginBottom: '10px',
                textAlign: message.sender === 'me' ? 'right' : 'left',
              }}
            >
              <p
                style={{
                  backgroundColor: message.sender === 'me' ? '#0084ff' : '#f0f0f0',
                  color: message.sender === 'me' ? '#fff' : '#000',
                  padding: '10px',
                  borderRadius: '10px',
                  marginLeft: message.sender === 'me' ? 'auto' : '0',
                  display: 'inline-block',
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {message.text}
              </p>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div id='inputarea' style={{
          padding: '10px',
          borderTop: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
        }}>
          <button onClick={handleAddEmoji} id='buttonimg' style={{ marginRight: '10px', cursor: 'pointer' }}>
            😊
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '20px',
              border: '1px solid #ccc',
              marginRight: '10px',
            }}
            id='inputbox'
          />
          <button 
          id='senditems'
            onClick={handleSendMessage}
            style={{
              cursor: 'pointer',
              backgroundColor: '#0084ff',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '5px',
              border: 'none',
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* ==================================================================  Right Sidebar */}
      <div className='rightContent'
      // style={{
      //   width: '250px',
      //   backgroundColor: '#f0f2f5',
      //   padding: '10px',
      //   borderLeft: '1px solid #ddd',
      //   marginTop: '3%',
      // }}
      >
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <img src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png" alt="profile" style={{ borderRadius: '50%', width: '100%', height: '100%' }} />
          <h4 style={{ margin: '10px 0 0' }}>Olenna Mason</h4>
          <p style={{ margin: '0', color: '#888' }}>Active 4m ago</p>
        </div>
        <hr />
        <div style={{ padding: '10px 0', color: '#555' }}>
          <p style={{ fontWeight: 'bold', fontSize: '0.9em' }}>Options</p>
          {/* <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
            🔍 <span style={{ marginLeft: '10px' }}>Search in Conversation</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
            ✏️ <span style={{ marginLeft: '10px' }}>Edit Nicknames</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
            🎨 <span style={{ marginLeft: '10px' }}>Change Color</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
            👍 <span style={{ marginLeft: '10px' }}>Change Emoji</span>
          </div> */}
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
            🔔 <span style={{ marginLeft: '10px' }}>Notifications</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
            ❌ <span style={{ marginLeft: '10px' }}>Delete Chat</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
            🚫 <span style={{ marginLeft: '10px' }}>Block User</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '10px' }}>
            ➕ <span style={{ marginLeft: '10px' }}>Add Friend List</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
