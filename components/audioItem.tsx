"use client";

import type { Podcast } from "@/types/podcast";

import { Button } from "@heroui/button";
import { Clock, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { DateFormatFromNow } from "./date.format";

interface AudioItemProps {
  podcast: Podcast;
  locale: string;
  className?: string;
}

export function AudioItem({ podcast, locale, className = "" }: AudioItemProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // 格式化时间显示
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // 播放/暂停切换
  const togglePlayPause = async () => {
    if (!audioRef.current) return;

    setIsLoading(true);

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 静音切换
  const toggleMute = () => {
    if (!audioRef.current) return;

    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // 音量控制
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  // 进度条控制
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // 音频事件监听
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  return (
    <div
      className={`group  transition-all duration-300 border rounded-lg border-gray-200 ${className}`}
    >
      <div className="p-0">
        {/* 封面图片和播放控制区域 */}
        <div className="relative">
          <div className="flex items-center gap-4 p-4">
            {/* 封面图片 */}
            <div className="relative flex-shrink-0">
              <img
                alt={podcast.title}
                className="w-20 h-20 rounded-lg object-contain shadow-md"
                src={podcast.cover || "/logo.svg"}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;

                  target.src = "/logo.svg";
                }}
              />

              {/* 播放按钮覆盖层 */}
              <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  isIconOnly
                  className="rounded-full w-12 h-12"
                  color="primary"
                  disabled={isLoading}
                  isLoading={isLoading}
                  size="lg"
                  onPress={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </Button>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {podcast.title}
                </h3>
              </div>

              {/* 描述 */}
              <p className="text-sm text-default-600 mb-3 line-clamp-2">
                {podcast.description || "暂无描述"}
              </p>

              {/* 时间信息 */}
              <div className="flex items-center gap-4 text-xs text-default-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{DateFormatFromNow(podcast.createdAt, locale)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 音频控制区域 */}
          <div className="px-4 pb-4">
            {/* 进度条 */}
            <div className="mb-3">
              <input
                className="w-full h-2 bg-default-200 rounded-lg appearance-none cursor-pointer slider"
                max={duration || 0}
                min="0"
                style={{
                  background: `linear-gradient(to right, #3aac0f 0%,#3aac0f ${(currentTime / duration) * 100}%, #e4e4e7 ${(currentTime / duration) * 100}%, #e4e4e7 100%)`,
                }}
                type="range"
                value={currentTime}
                onChange={handleProgressChange}
              />
            </div>

            {/* 控制按钮和时间显示 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-default-500">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs text-default-400">/</span>
                <span className="text-xs text-default-500">
                  {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* 音量控制 */}
                <Button
                  isIconOnly
                  className="w-8 h-8"
                  size="sm"
                  variant="light"
                  onPress={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>

                {/* 音量滑块 */}
                <input
                  className="w-16 h-1 bg-default-200 rounded-lg appearance-none cursor-pointer slider"
                  max="1"
                  min="0"
                  step="0.1"
                  type="range"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 隐藏的音频元素 */}
        <audio
          ref={audioRef}
          className="hidden"
          preload="metadata"
          src={podcast.enclosure}
        >
          <track kind="captions" />
        </audio>
      </div>
    </div>
  );
}
