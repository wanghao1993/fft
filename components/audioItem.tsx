"use client";

import type { Podcast } from "@/types/podcast";

import { Button } from "@heroui/button";
import { Clock, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

import { DateFormatFromNow } from "./date.format";

// 全局状态管理当前播放的音频
let currentPlayingAudio: HTMLAudioElement | null = null;
let currentPlayingId: string | null = null;

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
      // 如果当前音频正在播放，则暂停
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        if (currentPlayingId === podcast.id) {
          currentPlayingAudio = null;
          currentPlayingId = null;
        }
      } else {
        // 停止其他正在播放的音频
        if (currentPlayingAudio && currentPlayingAudio !== audioRef.current) {
          currentPlayingAudio.pause();
        }

        // 播放当前音频
        await audioRef.current.play();
        setIsPlaying(true);
        currentPlayingAudio = audioRef.current;
        currentPlayingId = podcast.id;
      }
    } catch {
      // Error playing audio
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
      if (currentPlayingId === podcast.id) {
        currentPlayingAudio = null;
        currentPlayingId = null;
      }
    };

    const handlePlay = () => {
      setIsPlaying(true);
      currentPlayingAudio = audio;
      currentPlayingId = podcast.id;
    };

    const handlePause = () => {
      setIsPlaying(false);
      if (currentPlayingId === podcast.id) {
        currentPlayingAudio = null;
        currentPlayingId = null;
      }
    };

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

  // 处理卡片点击
  const handleCardClick = (e: React.MouseEvent) => {
    // 如果点击的是按钮或控制元素，不触发卡片点击
    if (
      (e.target as HTMLElement).closest("button") ||
      (e.target as HTMLElement).closest("input") ||
      (e.target as HTMLElement).closest('[role="button"]')
    ) {
      return;
    }
    togglePlayPause();
  };

  return (
    <div
      className={`group transition-all duration-300 border rounded-lg border-gray-200 touch-manipulation cursor-pointer ${className}`}
      role="button"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePlayPause();
        }
      }}
    >
      <div className="p-0">
        {/* 封面图片和播放控制区域 */}
        <div className="relative">
          <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
            {/* 封面图片 */}
            <div className="relative flex-shrink-0">
              <img
                alt={podcast.title}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-contain shadow-md"
                src={podcast.cover || "/logo.svg"}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;

                  target.src = "/logo.svg";
                }}
              />

              {/* 播放按钮覆盖层 - 桌面端悬停显示 */}
              <div className="absolute inset-0 bg-black/30 rounded-lg items-center justify-center opacity-0 group-hover:opacity-100 hidden sm:flex transition-opacity duration-300">
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

              {/* 移动端播放按钮 - 始终可见，显示播放状态 */}
              <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center opacity-100 sm:hidden transition-opacity duration-300">
                <Button
                  isIconOnly
                  className="rounded-full w-10 h-10 bg-white/90 text-black hover:bg-white"
                  disabled={isLoading}
                  isLoading={isLoading}
                  size="lg"
                  onPress={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </Button>
              </div>
            </div>

            {/* 内容区域 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1 sm:mb-2">
                <h3 className="font-semibold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {podcast.title}
                </h3>
              </div>

              {/* 描述 */}
              <p className="text-xs sm:text-sm text-default-600 mb-2 sm:mb-3 line-clamp-2">
                {podcast.description || "暂无描述"}
              </p>

              {/* 时间信息 */}
              <div className="flex items-center gap-2 sm:gap-4 text-xs text-default-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span className="hidden sm:inline">
                    {DateFormatFromNow(podcast.createdAt, locale)}
                  </span>
                  <span className="sm:hidden">
                    {DateFormatFromNow(podcast.createdAt, locale).split(" ")[0]}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 音频控制区域 */}
          <div className="px-3 pb-3 sm:px-4 sm:pb-4">
            {/* 进度条 */}
            <div className="mb-2 sm:mb-3">
              <input
                className="w-full h-3 sm:h-2 bg-default-200 rounded-lg appearance-none cursor-pointer slider touch-manipulation"
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
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-xs text-default-500">
                  {formatTime(currentTime)}
                </span>
                <span className="text-xs text-default-400">/</span>
                <span className="text-xs text-default-500">
                  {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                {/* 音量控制 - 在移动端隐藏音量滑块 */}
                <Button
                  isIconOnly
                  className="w-7 h-7 sm:w-8 sm:h-8"
                  size="sm"
                  variant="light"
                  onPress={toggleMute}
                >
                  {isMuted ? (
                    <VolumeX className="h-3 w-3 sm:h-4 sm:w-4" />
                  ) : (
                    <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                  )}
                </Button>

                {/* 音量滑块 - 仅在桌面端显示 */}
                <input
                  className="hidden sm:block w-16 h-1 bg-default-200 rounded-lg appearance-none cursor-pointer slider"
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
