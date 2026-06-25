const people = [
  { name: "Person A", preference: "Adventure", dreamPlace: "Rishikesh River Belt" },
  { name: "Person B", preference: "Food", dreamPlace: "Amritsar Food Walk" },
  { name: "Person C", preference: "Shopping", dreamPlace: "Pushkar Lake Market" },
  { name: "Person D", preference: "Temples", dreamPlace: "Varanasi Ghats" }
];

const preferences = [
  "Adventure",
  "Food",
  "Shopping",
  "Temples",
  "Nature",
  "History",
  "Beaches",
  "Culture"
];

const cities = [
  { name: "Bengaluru", state: "Karnataka", zone: "south" },
  { name: "Delhi", state: "Delhi", zone: "north" },
  { name: "Mumbai", state: "Maharashtra", zone: "west" },
  { name: "Hyderabad", state: "Telangana", zone: "south" },
  { name: "Chennai", state: "Tamil Nadu", zone: "south" },
  { name: "Kolkata", state: "West Bengal", zone: "east" },
  { name: "Jaipur", state: "Rajasthan", zone: "west" },
  { name: "Kochi", state: "Kerala", zone: "south" },
  { name: "Guwahati", state: "Assam", zone: "east" },
  { name: "Ahmedabad", state: "Gujarat", zone: "west" }
];

const destinations = [
  {
    name: "Jaipur Old City",
    state: "Rajasthan",
    type: "History",
    cost: 9000,
    days: 1,
    rating: 4.8,
    family: 5,
    solo: 4,
    hidden: false,
    vibe: "forts, palaces, bazaars, royal streets"
  },
  {
    name: "Varanasi Ghats",
    state: "Uttar Pradesh",
    type: "Temples",
    cost: 7000,
    days: 1,
    rating: 4.9,
    family: 4,
    solo: 5,
    hidden: false,
    vibe: "sunrise boats, temples, spiritual lanes"
  },
  {
    name: "Rishikesh River Belt",
    state: "Uttarakhand",
    type: "Adventure",
    cost: 8500,
    days: 1,
    rating: 4.8,
    family: 4,
    solo: 5,
    hidden: false,
    vibe: "rafting, yoga cafes, Ganga views"
  },
  {
    name: "Gokarna Beaches",
    state: "Karnataka",
    type: "Beaches",
    cost: 9500,
    days: 1,
    rating: 4.7,
    family: 4,
    solo: 5,
    hidden: true,
    vibe: "quiet beaches, cliff walks, sunset cafes"
  },
  {
    name: "Majuli River Island",
    state: "Assam",
    type: "Culture",
    cost: 11000,
    days: 1,
    rating: 4.8,
    family: 4,
    solo: 4,
    hidden: true,
    vibe: "satras, village art, river island life"
  },
  {
    name: "Ziro Valley",
    state: "Arunachal Pradesh",
    type: "Nature",
    cost: 14000,
    days: 2,
    rating: 4.9,
    family: 4,
    solo: 5,
    hidden: true,
    vibe: "green valleys, music, Apatani culture"
  },
  {
    name: "Gandikota Canyon",
    state: "Andhra Pradesh",
    type: "Adventure",
    cost: 7500,
    days: 1,
    rating: 4.7,
    family: 3,
    solo: 4,
    hidden: true,
    vibe: "India's grand canyon, fort, river views"
  },
  {
    name: "Hampi Heritage Trail",
    state: "Karnataka",
    type: "History",
    cost: 10000,
    days: 2,
    rating: 4.9,
    family: 4,
    solo: 5,
    hidden: false,
    vibe: "ancient ruins, boulders, sunset points"
  },
  {
    name: "Amritsar Food Walk",
    state: "Punjab",
    type: "Food",
    cost: 8000,
    days: 1,
    rating: 4.8,
    family: 5,
    solo: 4,
    hidden: false,
    vibe: "Golden Temple, kulcha, lassi, old streets"
  },
  {
    name: "Kochi and Fort Kochi",
    state: "Kerala",
    type: "Culture",
    cost: 12000,
    days: 1,
    rating: 4.7,
    family: 5,
    solo: 5,
    hidden: false,
    vibe: "sea breeze, art cafes, colonial lanes"
  },
  {
    name: "Chettinad Mansions",
    state: "Tamil Nadu",
    type: "Food",
    cost: 6500,
    days: 1,
    rating: 4.6,
    family: 4,
    solo: 4,
    hidden: true,
    vibe: "heritage homes, spicy cuisine, quiet towns"
  },
  {
    name: "Meghalaya Living Roots",
    state: "Meghalaya",
    type: "Nature",
    cost: 13000,
    days: 2,
    rating: 4.9,
    family: 4,
    solo: 5,
    hidden: true,
    vibe: "root bridges, waterfalls, clean villages"
  },
  {
    name: "Delhi Chandni Chowk",
    state: "Delhi",
    type: "Shopping",
    cost: 6000,
    days: 1,
    rating: 4.5,
    family: 3,
    solo: 4,
    hidden: false,
    vibe: "street food, markets, monuments nearby"
  },
  {
    name: "Pushkar Lake Market",
    state: "Rajasthan",
    type: "Shopping",
    cost: 7000,
    days: 1,
    rating: 4.6,
    family: 4,
    solo: 5,
    hidden: true,
    vibe: "lake cafes, handicrafts, desert mood"
  },
  {
    name: "Khajuraho Temples",
    state: "Madhya Pradesh",
    type: "Temples",
    cost: 8500,
    days: 1,
    rating: 4.7,
    family: 4,
    solo: 4,
    hidden: false,
    vibe: "temple art, history, calm gardens"
  },
  {
    name: "Dawki and Shnongpdeng",
    state: "Meghalaya",
    type: "Adventure",
    cost: 9500,
    days: 1,
    rating: 4.8,
    family: 3,
    solo: 5,
    hidden: true,
    vibe: "clear river, camping, kayaking"
  }
];

const graph = {};
destinations.forEach((place, index) => {
  graph[place.name] = {};
  destinations.forEach((other, otherIndex) => {
    if (place.name !== other.name) {
      const stateBonus = place.state === other.state ? 4 : 18;
      graph[place.name][other.name] = Math.abs(index - otherIndex) * 3 + stateBonus;
    }
  });
});
graph["Start"] = {};
destinations.forEach((place, index) => {
  graph["Start"][place.name] = 6 + index * 2;
});

const friendsEl = document.querySelector("#friends");
const destinationGrid = document.querySelector("#destinationGrid");
const budget = document.querySelector("#budget");
const days = document.querySelector("#days");
const budgetValue = document.querySelector("#budgetValue");
const daysValue = document.querySelector("#daysValue");
const startCity = document.querySelector("#startCity");
const endCity = document.querySelector("#endCity");
const customStart = document.querySelector("#customStart");
const customEnd = document.querySelector("#customEnd");
const form = document.querySelector("#plannerForm");

function renderCityControls() {
  startCity.innerHTML = `
    <option value="">Choose start manually</option>
    ${cities.map(city => `<option value="${city.name}">${city.name}, ${city.state}</option>`).join("")}
  `;
  endCity.innerHTML = `
    <option value="">Choose end manually</option>
    ${cities.map(city => `<option value="${city.name}">${city.name}, ${city.state}</option>`).join("")}
  `;
}

function renderFriendControls() {
  friendsEl.innerHTML = people.map((person, index) => `
    <div class="friend-row">
      <select aria-label="${person.name} name" data-name="${index}">
        <option>${person.name}</option>
        <option>Friend ${index + 1}</option>
        <option>Family Member ${index + 1}</option>
      </select>
      <select aria-label="${person.name} preference" data-pref="${index}">
        ${preferences.map(pref => `<option ${pref === person.preference ? "selected" : ""}>${pref}</option>`).join("")}
      </select>
      <select class="place-choice" aria-label="${person.name} dream location" data-place="${index}">
        <option value="">Any best place</option>
        ${destinations.map(place => `<option value="${place.name}" ${place.name === person.dreamPlace ? "selected" : ""}>${place.name} - ${place.state}</option>`).join("")}
      </select>
    </div>
  `).join("");
}

function renderDestinations() {
  destinationGrid.innerHTML = destinations.map(place => `
    <article class="destination-card ${place.hidden ? "hidden-gem" : ""}">
      <span>${place.hidden ? "Hidden gem" : "Famous place"} | ${place.type}</span>
      <h3>${place.name}</h3>
      <p>${place.state}</p>
      <small>${place.vibe}</small>
    </article>
  `).join("");
}

function getCity(name) {
  return cities.find(city => city.name === name) || null;
}

function getStartCity() {
  const typedStart = customStart.value.trim();
  if (typedStart) {
    return { name: typedStart, state: "Custom start", zone: "custom" };
  }
  return getCity(startCity.value);
}

function getEndCity() {
  const typedEnd = customEnd.value.trim();
  if (typedEnd) {
    return { name: typedEnd, state: "Custom end", zone: "custom" };
  }
  return getCity(endCity.value);
}

function placeZone(place) {
  const zones = {
    Rajasthan: "west",
    Delhi: "north",
    Punjab: "north",
    Uttarakhand: "north",
    "Uttar Pradesh": "north",
    "Madhya Pradesh": "central",
    Karnataka: "south",
    Kerala: "south",
    "Tamil Nadu": "south",
    "Andhra Pradesh": "south",
    Assam: "east",
    Meghalaya: "east",
    "Arunachal Pradesh": "east"
  };
  return zones[place.state] || "central";
}

function distanceFromCity(place, city) {
  if (!city) return 15;
  if (place.state === city.state) return 4;
  if (city.zone === "custom") return 15;
  if (placeZone(place) === city.zone) return 10;
  return 22 + Math.abs(destinations.indexOf(place) - cities.indexOf(city));
}

function scenicBetween(previousName, place) {
  const scenic = {
    Rajasthan: "Stop for desert sunsets, handmade markets, and old-city photo lanes.",
    "Uttar Pradesh": "Take a calm river-side break and try local sweets during travel.",
    Uttarakhand: "Keep time for mountain views, river cafes, and suspension bridge walks.",
    Karnataka: "Add boulder viewpoints, temple ruins, or a peaceful coastal sunset.",
    Assam: "Enjoy tea gardens, river views, and quiet village roads between stops.",
    "Arunachal Pradesh": "Travel slowly through valley roads, pine views, and local cafes.",
    "Andhra Pradesh": "Pause near canyon viewpoints and fort-side sunset spots.",
    Punjab: "Plan a food halt with kulcha, lassi, and evening city lights.",
    Kerala: "Add backwater views, spice markets, and seaside walking lanes.",
    "Tamil Nadu": "Stop for heritage homes, temple streets, and regional food.",
    Meghalaya: "Keep space for waterfalls, cloud views, and clean village trails.",
    Delhi: "Use old-market lanes and monument viewpoints as short travel breaks.",
    "Madhya Pradesh": "Add heritage gardens, stone temples, and quiet museum time."
  };
  return `${previousName} to ${place.name}: ${scenic[place.state] || "Add a scenic local food, nature, or culture break between stops."}`;
}

function dijkstra(start) {
  const dist = {};
  const visited = new Set();
  Object.keys(graph).forEach(node => dist[node] = Infinity);
  dist[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    let current = null;
    for (const node of Object.keys(graph)) {
      if (!visited.has(node) && (current === null || dist[node] < dist[current])) current = node;
    }
    if (current === null || dist[current] === Infinity) break;
    visited.add(current);
    for (const [next, weight] of Object.entries(graph[current] || {})) {
      dist[next] = Math.min(dist[next], dist[current] + weight);
    }
  }
  return dist;
}

function getGroupPreferences() {
  return [...document.querySelectorAll("[data-pref]")].map(select => select.value);
}

function getPlaceChoices() {
  return [...document.querySelectorAll("[data-place]")]
    .map(select => select.value)
    .filter(Boolean);
}

function scoreDestination(place, groupPrefs, placeChoices, tripType) {
  const preferenceMatches = groupPrefs.filter(pref => pref === place.type).length;
  const exactPlaceMatches = placeChoices.filter(choice => choice === place.name).length;
  const sameStateMatches = placeChoices
    .map(choice => destinations.find(placeItem => placeItem.name === choice))
    .filter(choicePlace => choicePlace && choicePlace.state === place.state).length;
  const fairness = preferenceMatches > 0 ? 45 + preferenceMatches * 18 : 16;
  const exactChoiceBonus = exactPlaceMatches * 80;
  const nearbyChoiceBonus = sameStateMatches * 14;
  const typeBonus = tripType === "family" ? place.family * 7 : tripType === "solo" ? place.solo * 7 : 30;
  const hiddenBonus = place.hidden ? 12 : 5;
  return Math.round(fairness + exactChoiceBonus + nearbyChoiceBonus + typeBonus + place.rating * 8 + hiddenBonus);
}

function selectByDynamicProgramming(scored, maxBudget, maxDays) {
  const budgetUnits = Math.floor(maxBudget / 1000);
  const dp = Array.from({ length: scored.length + 1 }, () =>
    Array.from({ length: budgetUnits + 1 }, () => Array(maxDays + 1).fill(0))
  );

  for (let i = 1; i <= scored.length; i++) {
    const item = scored[i - 1];
    const c = Math.ceil(item.cost / 1000);
    const d = item.days;
    for (let b = 0; b <= budgetUnits; b++) {
      for (let day = 0; day <= maxDays; day++) {
        dp[i][b][day] = dp[i - 1][b][day];
        if (c <= b && d <= day) {
          dp[i][b][day] = Math.max(dp[i][b][day], dp[i - 1][b - c][day - d] + item.score);
        }
      }
    }
  }

  const chosen = [];
  let b = budgetUnits;
  let day = maxDays;
  for (let i = scored.length; i > 0; i--) {
    if (dp[i][b][day] !== dp[i - 1][b][day]) {
      const item = scored[i - 1];
      chosen.push(item);
      b -= Math.ceil(item.cost / 1000);
      day -= item.days;
    }
  }
  return chosen.reverse();
}

function orderRoute(chosen, start) {
  const ordered = [];
  let current = null;
  const remaining = [...chosen];
  while (remaining.length) {
    const distances = current ? dijkstra(current) : null;
    remaining.sort((a, b) => {
      const aDistance = current ? distances[a.name] : distanceFromCity(a, start);
      const bDistance = current ? distances[b.name] : distanceFromCity(b, start);
      return aDistance - bDistance || b.score - a.score;
    });
    const next = remaining.shift();
    ordered.push({ ...next, routeWeight: current ? distances[next.name] : distanceFromCity(next, start) });
    current = next.name;
  }
  return ordered;
}

function renderJourneyMap(route, start, end) {
  const stops = [
    { label: "Start", name: start.name, detail: start.state, kind: "start" },
    ...route.map((place, index) => ({
      label: `Stop ${index + 1}`,
      name: place.name,
      detail: `${place.state} | ${place.chosenByGroup ? "Traveler choice" : place.hidden ? "Hidden gem" : "Famous place"}`,
      kind: place.chosenByGroup ? "choice" : "stop"
    })),
    { label: "End", name: end.name, detail: end.state, kind: "end" }
  ];

  const scenicStops = route.map((place, index) => {
    const previous = index === 0 ? start.name : route[index - 1].name;
    return `<li>${scenicBetween(previous, place)}</li>`;
  }).join("");

  document.querySelector("#journeyMap").innerHTML = `
    <div class="map-head">
      <h3>Route Map</h3>
      <span>${start.name} to ${end.name}</span>
    </div>
    <div class="map-line">
      ${stops.map(stop => `
        <div class="map-pin ${stop.kind}">
          <b>${stop.label}</b>
          <strong>${stop.name}</strong>
          <small>${stop.detail}</small>
        </div>
      `).join("")}
    </div>
    <div class="between-box">
      <strong>Beautiful places between travelling</strong>
      <ul>${scenicStops}</ul>
    </div>
  `;
}

function generatePlan() {
  const groupPrefs = getGroupPreferences();
  const placeChoices = getPlaceChoices();
  const tripType = document.querySelector("#tripType").value;
  const start = getStartCity();
  const end = getEndCity();
  const maxBudget = Number(budget.value);
  const maxDays = Number(days.value);

  if (!start || !end) {
    document.querySelector("#metrics").innerHTML = `
      <div class="metric"><strong>Choose</strong><span>Start point</span></div>
      <div class="metric"><strong>Choose</strong><span>End point</span></div>
      <div class="metric"><strong>${maxDays}</strong><span>Travel days</span></div>
      <div class="metric"><strong>Rs. ${maxBudget.toLocaleString("en-IN")}</strong><span>Budget</span></div>
    `;
    document.querySelector("#journeyMap").innerHTML = `
      <div class="map-head">
        <h3>Route Map</h3>
        <span>Waiting for manual start and end</span>
      </div>
      <div class="empty-map">
        Select a start location and end location, or type both manually. Then the route map and stops will update.
      </div>
    `;
    document.querySelector("#routeList").innerHTML = "";
    document.querySelector("#explainBox").innerHTML = `
      <strong>Manual route setup:</strong>
      choose or type your starting point and ending point first. The itinerary will then build around your marked locations.
    `;
    return;
  }
  const scored = destinations
    .map(place => ({
      ...place,
      chosenByGroup: placeChoices.includes(place.name),
      score: scoreDestination(place, groupPrefs, placeChoices, tripType)
    }))
    .sort((a, b) => b.score - a.score || a.cost - b.cost);

  const selected = selectByDynamicProgramming(scored, maxBudget, maxDays);
  const route = orderRoute(selected, start);
  const totalCost = route.reduce((sum, place) => sum + place.cost, 0);
  const totalDays = route.reduce((sum, place) => sum + place.days, 0);
  const hiddenCount = route.filter(place => place.hidden).length;
  const endDistance = route.length ? distanceFromCity(route[route.length - 1], end) : 0;
  const satisfaction = route.length
    ? Math.min(99, Math.round(route.reduce((sum, place) => sum + place.score, 0) / (route.length * 1.35)))
    : 0;

  document.querySelector("#metrics").innerHTML = `
    <div class="metric"><strong>${satisfaction}%</strong><span>Group match</span></div>
    <div class="metric"><strong>Rs. ${totalCost.toLocaleString("en-IN")}</strong><span>Trip budget</span></div>
    <div class="metric"><strong>${totalDays}</strong><span>Travel days</span></div>
    <div class="metric"><strong>${hiddenCount}</strong><span>Hidden gems</span></div>
    <div class="metric"><strong>${end.name}</strong><span>Trip ends here</span></div>
  `;

  renderJourneyMap(route, start, end);

  let dayCounter = 1;
  document.querySelector("#routeList").innerHTML = route.map(place => {
    const startDay = dayCounter;
    const endDay = dayCounter + place.days - 1;
    dayCounter += place.days;
    const dayLabel = startDay === endDay ? `Day ${startDay}` : `Days ${startDay}-${endDay}`;
    return `
      <li>
        <strong>${dayLabel}: ${place.name} ${place.chosenByGroup ? "<em>Traveler choice</em>" : ""}</strong>
        <small>Stop from ${start.name} route | ${place.state} | ${place.type} | ${place.hidden ? "hidden gem" : "famous place"} | ${place.chosenByGroup ? "traveler choice" : "best match"} | Rs. ${place.cost.toLocaleString("en-IN")} | ${place.days} day${place.days > 1 ? "s" : ""}</small>
        <p>${place.vibe}</p>
      </li>
    `;
  }).join("");

  const selectedChoices = route.filter(place => place.chosenByGroup).length;
  document.querySelector("#explainBox").innerHTML = `
    <strong>Why this trip feels balanced:</strong>
    it includes ${selectedChoices} exact traveler location choice${selectedChoices === 1 ? "" : "s"}, matches the group's selected interests,
    stays within Rs. ${maxBudget.toLocaleString("en-IN")},
    fits ${maxDays} travel days, mixes popular Indian destinations with beautiful hidden places,
    starts from ${start.name}, stops at the best selected locations, and ends at ${end.name}.
    Final connection score to end location: ${endDistance}.
  `;
}

budget.addEventListener("input", () => {
  budgetValue.textContent = `Rs. ${Number(budget.value).toLocaleString("en-IN")}`;
});

days.addEventListener("input", () => {
  daysValue.textContent = `${days.value} day${Number(days.value) > 1 ? "s" : ""}`;
});

function refreshPlan() {
  generatePlan();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  generatePlan();
});

form.addEventListener("change", refreshPlan);

renderCityControls();
renderFriendControls();
renderDestinations();
generatePlan();
