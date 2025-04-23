import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import axiosInstance from '../lib/axiosInstance';
import toast from 'react-hot-toast';
import useUserStore from '../store/userStore';

function Meeting() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomID = searchParams.get('roomID');
  const { id, name } = useUserStore();
  const containerRef = useRef(null);
  const [kitToken, setKitToken] = useState(null);

  useEffect(() => {
    if (!roomID) {
      toast.error('Meeting ID not found!');
      navigate('/dashboard');
      return;
    }
    if (!id || !name) {
      toast.error('User not logged in!');
      navigate('/login');
      return;
    }
    const fetchToken = async () => {
      try {
        const res = await axiosInstance.post('/event/token', { meetingID: roomID });
        const { token, appID } = res.data;
        const generatedToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
          appID,
          token,
          roomID,
          id,
          name
        );
        setKitToken(generatedToken);
      } catch (err) {
        toast.error('Failed to fetch meeting token: ' + err.message);
        navigate('/dashboard');
      }
    };

    fetchToken();
  }, [roomID, id, name, navigate]);

  useEffect(() => {
    if (kitToken && containerRef.current) {
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      
      zp.joinRoom({
        container: containerRef.current,
        // sharedLinks: [
        //   {
        //     name: 'Personal link',
        //     url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomID}`,
        //   },
        // ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
        screenSharingConfig: {
          resolution: "auto"
        },
        showRoomDetailsButton: false,
        layout: "Grid"

      });
    }
  }, [kitToken, roomID]);

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '90vh'}}
    ></div>
  );
}

export default Meeting;
