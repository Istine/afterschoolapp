"use client";

import {
  FastForward,
  Maximize2,
  Pause,
  Play,
  RectangleHorizontal,
  Rewind,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Slider } from "./slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Input } from "./input";

const Controls = ({
  play,
  onForward,
  onRewind,
  setPlay,
  onSeek,
  onSeekUp,
  played,
  duration,
  currentTime,
  playBackRateHandler,
  playBackRate,
  toggleVolume,
  muted,
  onVolumeChange,
  makeFullScreen,
  volume,
  app,
}: {
  play: boolean;
  setPlay: any;
  onForward: any;
  onRewind: any;
  played: number;
  onSeek: any;
  volume: number;
  onSeekUp: any;
  currentTime: string;
  duration: string;
  playBackRateHandler: any;
  playBackRate: number;
  toggleVolume: any;
  muted: boolean;
  onVolumeChange: any;
  makeFullScreen: any;
  app: string;
}) => {
  const elapsed = isNaN(played) ? 0 : played;

  return (
    <div className="w-full absolute bg-opacity-50 bottom-0 bg-gradient-to-t from-[rgba(20,23,28,0.9)] via-[rgba(20,23,28,0.126)] to-transparent  h-[70px] p-3 transition-opacity opacity-0 group-hover:opacity-100">
      <Slider
        defaultValue={[0]}
        value={[elapsed * 100]}
        max={100}
        className="w-full"
        minStepsBetweenThumbs={1}
        onValueChange={onSeek}
        onValueCommit={onSeekUp}
      />
      <div className="w-full flex justify-between  mt-4">
        <div className="w-auto flex items-center">
          <span onClick={setPlay} className="mr-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {play ? (
                    <Pause
                      className="fill-gray-100 hover:fill-white stroke-gray-100 hover:stroke-white cursor-pointer"
                      size={20}
                    />
                  ) : (
                    <Play
                      className="fill-gray-100 hover:fill-white stroke-gray-100 hover:stroke-white cursor-pointer"
                      size={20}
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {play ? <p>Pause</p> : <p>Play</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <span onClick={onRewind} className="mr-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Rewind
                    className="stroke-gray-100 hover:stroke-white hover:fill-white cursor-pointer"
                    size={20}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rewind 5s</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="mr-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="px-3 font-bold font-sans w-[50px] text-sm text-center bg-gray-100 hover:bg-background cursor-pointer">
                        {playBackRate}x
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Playback rate</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
              <DropdownMenuGroup>
                {[1, 2, 3, 4].map((val, idx) => (
                  <DropdownMenuItem
                    className="font-bold font-sans text-center"
                    key={idx}
                    onClick={playBackRateHandler(val)}
                  >
                    {val}x
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <span onClick={onForward} className="mr-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <FastForward
                    className="stroke-gray-100 hover:stroke-white hover:fill-white cursor-pointer"
                    size={20}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Forward 5s</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <span className="mr-4" onClick={toggleVolume}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  {muted || volume === 0 ? (
                    <VolumeX
                      className="stroke-gray-100 hover:stroke-white cursor-pointer"
                      size={20}
                    />
                  ) : (
                    <Volume2
                      className="stroke-gray-100 hover:stroke-white cursor-pointer"
                      size={20}
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Volume</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <div
            className={`w-${
              muted ? "[0px]" : "[100px]"
            } duration-300 ease-in h-auto mr-4`}
          >
            <Input
              type="range"
              min={0}
              max={100}
              value={volume * 100}
              onChange={onVolumeChange}
              className={`${
                muted ? "w-[0px] invisible" : "w-full"
              } duration-300 ease-in m-0 p-0 h-auto`}
            />
          </div>
          <div className="flex mr-4 w-auto text-sm text-center  bg-transparent font-bold text-gray-100">
            <span>{currentTime}</span>
            <span>/</span>
            <span>{duration}</span>
          </div>
        </div>
        <div className="w-auto flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="mr-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Settings
                        className="stroke-gray-100 hover:stroke-white cursor-pointer"
                        size={20}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Settings</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
              <DropdownMenuGroup>
                {[1080, 720, 576, 432, 360].map((val, idx) => (
                  <DropdownMenuItem
                    className="font-bold font-sans text-center"
                    key={idx}
                  >
                    {val}p
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="font-bold font-sans text-center">
                  Auto
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="mr-4" onClick={makeFullScreen}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Maximize2
                    className="stroke-gray-100 hover:stroke-white cursor-pointer"
                    size={20}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Full Screen</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          {app === "client" ? (
            <span className="mr-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <RectangleHorizontal
                      className="stroke-gray-100 hover:stroke-white cursor-pointer"
                      size={20}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Theatre Mode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Controls;
