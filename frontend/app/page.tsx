"use client";

import { useState } from "react";

export default function TravelMate() {
  return (
    <div>
      <h1>Travel Mate</h1>

      <p>
        TravelMate is your all-in-one travel companion for discovering
        destinations, exploring places, and planning unforgettable trips.
        Discover new destinations, explore attractions and experiences, and
        organize your entire journey in one place.
      </p>

      <a href={`/destinations`}>Explore Destinations</a>
    </div>
  );
}
