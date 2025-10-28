// src/components/EventItem.jsx
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  CalendarDays,
} from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

// Utility to format time range
const formatTimeRange = (start, end) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  const startTime = start.toLocaleTimeString([], options);
  const endTime = end.toLocaleTimeString([], options);
  return `${startTime} - ${endTime}`;
};

// Utility to format duration
const formatDuration = (start, end) => {
  const diff = (end - start) / 1000 / 60; // minutes
  if (diff < 60) return `${diff} min`;
  const hrs = Math.floor(diff / 60);
  const mins = diff % 60;
  return `${hrs}h ${mins}m`;
};

const EventItem = ({ event }) => {
  // Platform color mapping
  const getPlatformColor = (platform) => {
    const colors = {
      leetcode: "#FFA116",
      codeforces: "#318CE7",
      codechef: "#5B4638",
      atcoder: "#222222",
      hackerrank: "#00EA64",
      geeksforgeeks: "#2F8D46",
      gfg: "#2F8D46",
    };
    return colors[platform] || "#6366F1";
  };

  // Platform readable names
  const getPlatformName = (platform) => {
    const names = {
      leetcode: "LeetCode",
      codeforces: "Codeforces",
      codechef: "CodeChef",
      atcoder: "AtCoder",
      hackerrank: "HackerRank",
      geeksforgeeks: "GeeksforGeeks",
      gfg: "GeeksforGeeks",
    };
    return names[platform] || "Other";
  };

  // Add event to Google Calendar
  const addToCalendar = () => {
    const start = event.startTime.toISOString().replace(/-|:|\.\d+/g, "");
    const end = event.endTime.toISOString().replace(/-|:|\.\d+/g, "");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${start}/${end}&details=${encodeURIComponent(
      event.description || ""
    )}&location=${encodeURIComponent(event.url)}`;
    window.open(url, "_blank");
  };

  // Date logic
  const isToday = () => {
    const today = new Date();
    const eventDate = new Date(event.startTime);
    return today.toDateString() === eventDate.toDateString();
  };

  const isSoon = () => {
    const now = new Date();
    const eventTime = new Date(event.startTime);
    const diff = eventTime - now;
    return diff > 0 && diff < 24 * 60 * 60 * 1000; // < 24 hrs
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className="rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 cursor-pointer relative"
            style={{ borderLeft: `5px solid ${getPlatformColor(event.platform)}` }}
          >
            <CardHeader className="pb-1">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xs font-semibold text-gray-800 truncate">
                  {event.title}
                </CardTitle>
                {(isToday() || isSoon()) && (
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </div>
            
            </CardHeader>

            <CardContent className="text-sm text-gray-700 space-y-2">
             
              <div className="flex items-center gap-2 font-bold">
                {getPlatformName(event.platform)}
              </div>
             
            </CardContent>
          </Card>
        </TooltipTrigger>

        {/* Tooltip content */}
        <TooltipContent className="w-72 p-4 bg-blue-50 border border-blue-600 shadow-md rounded-lg">
          <h3 className="font-semibold text-base text-blue-700 mb-1">
            {event.title}
          </h3>
          <div className="text-xs text-gray-600 mb-2">
            <span
              className="inline-block w-2 h-2 rounded-full mr-1"
              style={{ backgroundColor: getPlatformColor(event.platform) }}
            ></span>
            {getPlatformName(event.platform)}
          </div>

          <div className="text-sm mb-2 text-gray-700">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-gray-600" />
              <span>
                {formatTimeRange(
                  new Date(event.startTime),
                  new Date(event.endTime)
                )}
              </span>
            </div>
            <div className="text-gray-500 text-xs mt-1">
              Duration:{" "}
              {formatDuration(new Date(event.startTime), new Date(event.endTime))}
            </div>
          </div>

          {event.description && (
            <p className="text-sm text-gray-700 mb-2">{event.description}</p>
          )}

          <div className="flex justify-between items-center mt-3">
            <button
              onClick={addToCalendar}
              className="text-xs text-gray-700 hover:text-blue-800 flex items-center transition-colors"
            >
              <CalendarDays className="h-3 w-3 mr-1" />
              Add to Calendar
            </button>
            <a
              href={event.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs text-blue-700 hover:text-blue-900 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Visit website <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EventItem;
