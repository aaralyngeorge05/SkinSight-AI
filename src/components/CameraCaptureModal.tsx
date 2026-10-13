import React, { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, X, Check, AlertCircle } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (dataUrl: string) => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [capturedPreview, setCapturedPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCapturedPreview(null);
      setCameraError(null);
      return;
    }

    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access camera. Please allow camera permissions or upload an image directly.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
    setCapturedPreview(dataUrl);
  };

  const confirmCapture = () => {
    if (capturedPreview) {
      onCapture(capturedPreview);
      onClose();
    }
  };

  const retakeSnapshot = () => {
    setCapturedPreview(null);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-teal-400" />
            <h3 className="font-semibold text-slate-100 text-sm tracking-wide">
              Live Dermatoscopy Capture (predictlocally.py)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder area */}
        <div className="relative bg-black aspect-4/3 w-full flex items-center justify-center overflow-hidden">
          {cameraError ? (
            <div className="p-6 text-center max-w-sm">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <p className="text-slate-300 text-sm mb-4">{cameraError}</p>
              <button
                onClick={startCamera}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-lg transition-colors"
              >
                Retry Camera Access
              </button>
            </div>
          ) : capturedPreview ? (
            <img
              src={capturedPreview}
              alt="Snapshot preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Dermatoscopy Reticle Guidelines */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {/* Centered crosshair & circular lesion target zone */}
                <div className="relative w-52 h-52 rounded-full border-2 border-teal-400/80 shadow-[0_0_20px_rgba(45,212,191,0.25)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-teal-400" />
                  <div className="absolute top-0 w-4 h-0.5 bg-teal-400" />
                  <div className="absolute bottom-0 w-4 h-0.5 bg-teal-400" />
                  <div className="absolute left-0 w-0.5 h-4 bg-teal-400" />
                  <div className="absolute right-0 w-0.5 h-4 bg-teal-400" />
                  <span className="absolute -top-7 text-[11px] font-mono tracking-wider text-teal-400 uppercase bg-slate-950/80 px-2 py-0.5 rounded">
                    224×224 Tensor Target
                  </span>
                </div>
              </div>

              {/* Lighting tip */}
              <div className="absolute bottom-3 left-3 right-3 text-center pointer-events-none">
                <span className="inline-block text-[11px] font-medium text-slate-300 bg-slate-950/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-700/50">
                  Hold camera 10–15cm from skin with bright, glare-free light
                </span>
              </div>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={toggleFacingMode}
            disabled={!!capturedPreview || !!cameraError}
            className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Switch Camera
          </button>

          {capturedPreview ? (
            <div className="flex items-center gap-2">
              <button
                onClick={retakeSnapshot}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
              >
                Retake
              </button>
              <button
                onClick={confirmCapture}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 rounded-lg transition-colors shadow-lg shadow-teal-900/30"
              >
                <Check className="w-4 h-4" />
                Analyze Lesion
              </button>
            </div>
          ) : (
            <button
              onClick={takeSnapshot}
              disabled={!!cameraError}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-500 disabled:opacity-40 rounded-lg transition-colors shadow-lg shadow-teal-900/30"
            >
              <Camera className="w-4 h-4" />
              Capture Photo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
