/**
 * Comprehensive Indian States & Maharashtra Districts/Sub-districts/Talukas Dataset
 * Supports instant single-letter search & auto-fill for City, State, and Pincode
 */

export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  // Union Territories
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

export const CITIES_DATA = [
  // --- MAHARASHTRA DISTRICTS, SUB-DISTRICTS & TALUKAS ---
  // Solapur District & Sub-districts
  { city: 'Pandharpur', district: 'Solapur', state: 'Maharashtra', pincode: '413304' },
  { city: 'Solapur', district: 'Solapur', state: 'Maharashtra', pincode: '413001' },
  { city: 'Barshi', district: 'Solapur', state: 'Maharashtra', pincode: '413401' },
  { city: 'Mangalwedha', district: 'Solapur', state: 'Maharashtra', pincode: '413305' },
  { city: 'Sangola', district: 'Solapur', state: 'Maharashtra', pincode: '413307' },
  { city: 'Karmala', district: 'Solapur', state: 'Maharashtra', pincode: '413203' },
  { city: 'Madha', district: 'Solapur', state: 'Maharashtra', pincode: '413209' },
  { city: 'Mohol', district: 'Solapur', state: 'Maharashtra', pincode: '413213' },
  { city: 'Malshiras', district: 'Solapur', state: 'Maharashtra', pincode: '413107' },
  { city: 'Akkalkot', district: 'Solapur', state: 'Maharashtra', pincode: '413216' },
  { city: 'Kurduvadi', district: 'Solapur', state: 'Maharashtra', pincode: '413208' },
  { city: 'Akluj', district: 'Solapur', state: 'Maharashtra', pincode: '413101' },

  // Pune District & Talukas
  { city: 'Pune', district: 'Pune', state: 'Maharashtra', pincode: '411001' },
  { city: 'Pimpri-Chinchwad', district: 'Pune', state: 'Maharashtra', pincode: '411017' },
  { city: 'Baramati', district: 'Pune', state: 'Maharashtra', pincode: '413102' },
  { city: 'Shirur', district: 'Pune', state: 'Maharashtra', pincode: '412210' },
  { city: 'Daund', district: 'Pune', state: 'Maharashtra', pincode: '413801' },
  { city: 'Indapur', district: 'Pune', state: 'Maharashtra', pincode: '413106' },
  { city: 'Junnar', district: 'Pune', state: 'Maharashtra', pincode: '410502' },
  { city: 'Khed', district: 'Pune', state: 'Maharashtra', pincode: '410501' },
  { city: 'Ambegaon (Ghodegaon)', district: 'Pune', state: 'Maharashtra', pincode: '412408' },
  { city: 'Maval (Vadgaon)', district: 'Pune', state: 'Maharashtra', pincode: '412106' },
  { city: 'Mulshi (Paud)', district: 'Pune', state: 'Maharashtra', pincode: '412108' },
  { city: 'Bhor', district: 'Pune', state: 'Maharashtra', pincode: '412206' },
  { city: 'Saswad (Purandar)', district: 'Pune', state: 'Maharashtra', pincode: '412301' },
  { city: 'Lonavala', district: 'Pune', state: 'Maharashtra', pincode: '410401' },
  { city: 'Talegaon Dabhade', district: 'Pune', state: 'Maharashtra', pincode: '410506' },

  // Mumbai & Thane / MMR
  { city: 'Mumbai', district: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
  { city: 'Navi Mumbai', district: 'Thane', state: 'Maharashtra', pincode: '400703' },
  { city: 'Thane', district: 'Thane', state: 'Maharashtra', pincode: '400601' },
  { city: 'Kalyan', district: 'Thane', state: 'Maharashtra', pincode: '421301' },
  { city: 'Dombivli', district: 'Thane', state: 'Maharashtra', pincode: '421201' },
  { city: 'Ulhasnagar', district: 'Thane', state: 'Maharashtra', pincode: '421001' },
  { city: 'Bhiwandi', district: 'Thane', state: 'Maharashtra', pincode: '421302' },
  { city: 'Mira-Bhayandar', district: 'Thane', state: 'Maharashtra', pincode: '401107' },
  { city: 'Vasai', district: 'Palghar', state: 'Maharashtra', pincode: '401201' },
  { city: 'Virar', district: 'Palghar', state: 'Maharashtra', pincode: '401303' },
  { city: 'Palghar', district: 'Palghar', state: 'Maharashtra', pincode: '401404' },
  { city: 'Dahanu', district: 'Palghar', state: 'Maharashtra', pincode: '401601' },
  { city: 'Boisar', district: 'Palghar', state: 'Maharashtra', pincode: '401501' },
  { city: 'Badlapur', district: 'Thane', state: 'Maharashtra', pincode: '421503' },
  { city: 'Ambernath', district: 'Thane', state: 'Maharashtra', pincode: '421501' },

  // Nashik & North Maharashtra
  { city: 'Nashik', district: 'Nashik', state: 'Maharashtra', pincode: '422001' },
  { city: 'Malegaon', district: 'Nashik', state: 'Maharashtra', pincode: '423203' },
  { city: 'Sinnar', district: 'Nashik', state: 'Maharashtra', pincode: '422103' },
  { city: 'Niphad', district: 'Nashik', state: 'Maharashtra', pincode: '422303' },
  { city: 'Yeola', district: 'Nashik', state: 'Maharashtra', pincode: '423401' },
  { city: 'Igatpuri', district: 'Nashik', state: 'Maharashtra', pincode: '422403' },
  { city: 'Trimbakeshwar', district: 'Nashik', state: 'Maharashtra', pincode: '422212' },
  { city: 'Dhule', district: 'Dhule', state: 'Maharashtra', pincode: '424001' },
  { city: 'Shirpur', district: 'Dhule', state: 'Maharashtra', pincode: '425405' },
  { city: 'Jalgaon', district: 'Jalgaon', state: 'Maharashtra', pincode: '425001' },
  { city: 'Bhusawal', district: 'Jalgaon', state: 'Maharashtra', pincode: '425201' },
  { city: 'Chalisgaon', district: 'Jalgaon', state: 'Maharashtra', pincode: '424101' },
  { city: 'Nandurbar', district: 'Nandurbar', state: 'Maharashtra', pincode: '425412' },
  { city: 'Shahada', district: 'Nandurbar', state: 'Maharashtra', pincode: '425409' },

  // Chhatrapati Sambhaji Nagar (Aurangabad) & Marathwada
  { city: 'Chhatrapati Sambhaji Nagar (Aurangabad)', district: 'Chhatrapati Sambhaji Nagar', state: 'Maharashtra', pincode: '431001' },
  { city: 'Jalna', district: 'Jalna', state: 'Maharashtra', pincode: '431203' },
  { city: 'Beed', district: 'Beed', state: 'Maharashtra', pincode: '431122' },
  { city: 'Parli Vaijnath', district: 'Beed', state: 'Maharashtra', pincode: '431515' },
  { city: 'Ambejogai', district: 'Beed', state: 'Maharashtra', pincode: '431517' },
  { city: 'Latur', district: 'Latur', state: 'Maharashtra', pincode: '413512' },
  { city: 'Udgir', district: 'Latur', state: 'Maharashtra', pincode: '413517' },
  { city: 'Ahmedpur', district: 'Latur', state: 'Maharashtra', pincode: '413515' },
  { city: 'Dharashiv (Osmanabad)', district: 'Dharashiv', state: 'Maharashtra', pincode: '413501' },
  { city: 'Tuljapur', district: 'Dharashiv', state: 'Maharashtra', pincode: '413601' },
  { city: 'Nanded', district: 'Nanded', state: 'Maharashtra', pincode: '431601' },
  { city: 'Parbhani', district: 'Parbhani', state: 'Maharashtra', pincode: '431401' },
  { city: 'Hingoli', district: 'Hingoli', state: 'Maharashtra', pincode: '431513' },

  // Kolhapur & South Maharashtra
  { city: 'Kolhapur', district: 'Kolhapur', state: 'Maharashtra', pincode: '416001' },
  { city: 'Ichalkaranji', district: 'Kolhapur', state: 'Maharashtra', pincode: '416115' },
  { city: 'Jaysingpur', district: 'Kolhapur', state: 'Maharashtra', pincode: '416101' },
  { city: 'Gadhinglaj', district: 'Kolhapur', state: 'Maharashtra', pincode: '416502' },
  { city: 'Kagal', district: 'Kolhapur', state: 'Maharashtra', pincode: '416216' },
  { city: 'Panhala', district: 'Kolhapur', state: 'Maharashtra', pincode: '416201' },
  { city: 'Sangli', district: 'Sangli', state: 'Maharashtra', pincode: '416416' },
  { city: 'Miraj', district: 'Sangli', state: 'Maharashtra', pincode: '416410' },
  { city: 'Islampur (Walwa)', district: 'Sangli', state: 'Maharashtra', pincode: '415409' },
  { city: 'Tasgaon', district: 'Sangli', state: 'Maharashtra', pincode: '416312' },
  { city: 'Vita', district: 'Sangli', state: 'Maharashtra', pincode: '415311' },
  { city: 'Jath', district: 'Sangli', state: 'Maharashtra', pincode: '416404' },
  { city: 'Satara', district: 'Satara', state: 'Maharashtra', pincode: '415001' },
  { city: 'Karad', district: 'Satara', state: 'Maharashtra', pincode: '415110' },
  { city: 'Phaltan', district: 'Satara', state: 'Maharashtra', pincode: '415523' },
  { city: 'Wai', district: 'Satara', state: 'Maharashtra', pincode: '412803' },
  { city: 'Mahabaleshwar', district: 'Satara', state: 'Maharashtra', pincode: '412806' },
  { city: 'Panchgani', district: 'Satara', state: 'Maharashtra', pincode: '412805' },

  // Ahilyanagar (Ahmednagar)
  { city: 'Ahilyanagar (Ahmednagar)', district: 'Ahilyanagar', state: 'Maharashtra', pincode: '414001' },
  { city: 'Shirdi (Rahata)', district: 'Ahilyanagar', state: 'Maharashtra', pincode: '423109' },
  { city: 'Sangamner', district: 'Ahilyanagar', state: 'Maharashtra', pincode: '422605' },
  { city: 'Kopargaon', district: 'Ahilyanagar', state: 'Maharashtra', pincode: '423601' },
  { city: 'Shrirampur', district: 'Ahilyanagar', state: 'Maharashtra', pincode: '413709' },
  { city: 'Rahuri', district: 'Ahilyanagar', state: 'Maharashtra', pincode: '413705' },
  { city: 'Nevasa', district: 'Ahilyanagar', state: 'Maharashtra', pincode: '414603' },

  // Konkan Region
  { city: 'Panvel', district: 'Raigad', state: 'Maharashtra', pincode: '410206' },
  { city: 'Alibag', district: 'Raigad', state: 'Maharashtra', pincode: '402201' },
  { city: 'Karjat (Raigad)', district: 'Raigad', state: 'Maharashtra', pincode: '410201' },
  { city: 'Khopoli', district: 'Raigad', state: 'Maharashtra', pincode: '410203' },
  { city: 'Pen', district: 'Raigad', state: 'Maharashtra', pincode: '402107' },
  { city: 'Roha', district: 'Raigad', state: 'Maharashtra', pincode: '402109' },
  { city: 'Mahad', district: 'Raigad', state: 'Maharashtra', pincode: '402301' },
  { city: 'Ratnagiri', district: 'Ratnagiri', state: 'Maharashtra', pincode: '415612' },
  { city: 'Chiplun', district: 'Ratnagiri', state: 'Maharashtra', pincode: '415605' },
  { city: 'Khed (Ratnagiri)', district: 'Ratnagiri', state: 'Maharashtra', pincode: '415709' },
  { city: 'Sindhudurg (Oros)', district: 'Sindhudurg', state: 'Maharashtra', pincode: '416812' },
  { city: 'Sawantwadi', district: 'Sindhudurg', state: 'Maharashtra', pincode: '416510' },
  { city: 'Kankavli', district: 'Sindhudurg', state: 'Maharashtra', pincode: '416602' },
  { city: 'Malvan', district: 'Sindhudurg', state: 'Maharashtra', pincode: '416606' },

  // Vidarbha Region
  { city: 'Nagpur', district: 'Nagpur', state: 'Maharashtra', pincode: '440001' },
  { city: 'Kamptee', district: 'Nagpur', state: 'Maharashtra', pincode: '441001' },
  { city: 'Amravati', district: 'Amravati', state: 'Maharashtra', pincode: '444601' },
  { city: 'Achalpur', district: 'Amravati', state: 'Maharashtra', pincode: '444806' },
  { city: 'Akola', district: 'Akola', state: 'Maharashtra', pincode: '444001' },
  { city: 'Washim', district: 'Washim', state: 'Maharashtra', pincode: '444505' },
  { city: 'Buldhana', district: 'Buldhana', state: 'Maharashtra', pincode: '443001' },
  { city: 'Khamgaon', district: 'Buldhana', state: 'Maharashtra', pincode: '444303' },
  { city: 'Shegaon', district: 'Buldhana', state: 'Maharashtra', pincode: '444203' },
  { city: 'Yavatmal', district: 'Yavatmal', state: 'Maharashtra', pincode: '445001' },
  { city: 'Wardha', district: 'Wardha', state: 'Maharashtra', pincode: '442001' },
  { city: 'Hinganghat', district: 'Wardha', state: 'Maharashtra', pincode: '442301' },
  { city: 'Chandrapur', district: 'Chandrapur', state: 'Maharashtra', pincode: '442401' },
  { city: 'Ballarpur', district: 'Chandrapur', state: 'Maharashtra', pincode: '442701' },
  { city: 'Gadchiroli', district: 'Gadchiroli', state: 'Maharashtra', pincode: '442605' },
  { city: 'Bhandara', district: 'Bhandara', state: 'Maharashtra', pincode: '441904' },
  { city: 'Gondia', district: 'Gondia', state: 'Maharashtra', pincode: '441601' },

  // --- MAJOR CITIES ACROSS ALL INDIA ---
  // Madhya Pradesh
  { city: 'Indore', district: 'Indore', state: 'Madhya Pradesh', pincode: '452001' },
  { city: 'Bhopal', district: 'Bhopal', state: 'Madhya Pradesh', pincode: '462001' },
  { city: 'Jabalpur', district: 'Jabalpur', state: 'Madhya Pradesh', pincode: '482001' },
  { city: 'Gwalior', district: 'Gwalior', state: 'Madhya Pradesh', pincode: '474001' },
  { city: 'Ujjain', district: 'Ujjain', state: 'Madhya Pradesh', pincode: '456001' },
  { city: 'Sagar', district: 'Sagar', state: 'Madhya Pradesh', pincode: '470001' },
  { city: 'Dewas', district: 'Dewas', state: 'Madhya Pradesh', pincode: '455001' },
  { city: 'Satna', district: 'Satna', state: 'Madhya Pradesh', pincode: '485001' },
  { city: 'Ratlam', district: 'Ratlam', state: 'Madhya Pradesh', pincode: '457001' },

  // Karnataka
  { city: 'Bengaluru (Bangalore)', district: 'Bengaluru Urban', state: 'Karnataka', pincode: '560001' },
  { city: 'Mysuru (Mysore)', district: 'Mysuru', state: 'Karnataka', pincode: '570001' },
  { city: 'Hubballi-Dharwad', district: 'Dharwad', state: 'Karnataka', pincode: '580020' },
  { city: 'Mangaluru (Mangalore)', district: 'Dakshina Kannada', state: 'Karnataka', pincode: '575001' },
  { city: 'Belagavi (Belgaum)', district: 'Belagavi', state: 'Karnataka', pincode: '590001' },
  { city: 'Kalaburagi (Gulbarga)', district: 'Kalaburagi', state: 'Karnataka', pincode: '585101' },

  // Delhi NCR & Northern India
  { city: 'New Delhi', district: 'New Delhi', state: 'Delhi', pincode: '110001' },
  { city: 'Delhi', district: 'Central Delhi', state: 'Delhi', pincode: '110006' },
  { city: 'Noida', district: 'Gautam Buddha Nagar', state: 'Uttar Pradesh', pincode: '201301' },
  { city: 'Greater Noida', district: 'Gautam Buddha Nagar', state: 'Uttar Pradesh', pincode: '201310' },
  { city: 'Gurugram (Gurgaon)', district: 'Gurugram', state: 'Haryana', pincode: '122001' },
  { city: 'Faridabad', district: 'Faridabad', state: 'Haryana', pincode: '121001' },
  { city: 'Chandigarh', district: 'Chandigarh', state: 'Chandigarh', pincode: '160017' },

  // Gujarat
  { city: 'Ahmedabad', district: 'Ahmedabad', state: 'Gujarat', pincode: '380001' },
  { city: 'Surat', district: 'Surat', state: 'Gujarat', pincode: '395001' },
  { city: 'Vadodara (Baroda)', district: 'Vadodara', state: 'Gujarat', pincode: '390001' },
  { city: 'Rajkot', district: 'Rajkot', state: 'Gujarat', pincode: '360001' },
  { city: 'Gandhinagar', district: 'Gandhinagar', state: 'Gujarat', pincode: '382010' },
  { city: 'Bhavnagar', district: 'Bhavnagar', state: 'Gujarat', pincode: '364001' },
  { city: 'Jamnagar', district: 'Jamnagar', state: 'Gujarat', pincode: '361001' },

  // Telangana & Andhra Pradesh
  { city: 'Hyderabad', district: 'Hyderabad', state: 'Telangana', pincode: '500001' },
  { city: 'Warangal', district: 'Warangal', state: 'Telangana', pincode: '506002' },
  { city: 'Visakhapatnam', district: 'Visakhapatnam', state: 'Andhra Pradesh', pincode: '530001' },
  { city: 'Vijayawada', district: 'NTR', state: 'Andhra Pradesh', pincode: '520001' },
  { city: 'Guntur', district: 'Guntur', state: 'Andhra Pradesh', pincode: '522002' },
  { city: 'Tirupati', district: 'Tirupati', state: 'Andhra Pradesh', pincode: '517501' },

  // Tamil Nadu & Kerala
  { city: 'Chennai', district: 'Chennai', state: 'Tamil Nadu', pincode: '600001' },
  { city: 'Coimbatore', district: 'Coimbatore', state: 'Tamil Nadu', pincode: '641001' },
  { city: 'Madurai', district: 'Madurai', state: 'Tamil Nadu', pincode: '625001' },
  { city: 'Kochi (Cochin)', district: 'Ernakulam', state: 'Kerala', pincode: '682001' },
  { city: 'Thiruvananthapuram', district: 'Thiruvananthapuram', state: 'Kerala', pincode: '695001' },
  { city: 'Kozhikode (Calicut)', district: 'Kozhikode', state: 'Kerala', pincode: '673001' },

  // Rajasthan
  { city: 'Jaipur', district: 'Jaipur', state: 'Rajasthan', pincode: '302001' },
  { city: 'Jodhpur', district: 'Jodhpur', state: 'Rajasthan', pincode: '342001' },
  { city: 'Udaipur', district: 'Udaipur', state: 'Rajasthan', pincode: '313001' },
  { city: 'Kota', district: 'Kota', state: 'Rajasthan', pincode: '324001' },
  { city: 'Ajmer', district: 'Ajmer', state: 'Rajasthan', pincode: '305001' },

  // Uttar Pradesh & Bihar
  { city: 'Lucknow', district: 'Lucknow', state: 'Uttar Pradesh', pincode: '226001' },
  { city: 'Kanpur', district: 'Kanpur Nagar', state: 'Uttar Pradesh', pincode: '208001' },
  { city: 'Varanasi', district: 'Varanasi', state: 'Uttar Pradesh', pincode: '221001' },
  { city: 'Agra', district: 'Agra', state: 'Uttar Pradesh', pincode: '282001' },
  { city: 'Prayagraj (Allahabad)', district: 'Prayagraj', state: 'Uttar Pradesh', pincode: '211001' },
  { city: 'Patna', district: 'Patna', state: 'Bihar', pincode: '800001' },
  { city: 'Gaya', district: 'Gaya', state: 'Bihar', pincode: '823001' },

  // West Bengal, Odisha & East/North-East
  { city: 'Kolkata', district: 'Kolkata', state: 'West Bengal', pincode: '700001' },
  { city: 'Howrah', district: 'Howrah', state: 'West Bengal', pincode: '711101' },
  { city: 'Siliguri', district: 'Darjeeling', state: 'West Bengal', pincode: '734001' },
  { city: 'Bhubaneswar', district: 'Khurda', state: 'Odisha', pincode: '751001' },
  { city: 'Cuttack', district: 'Cuttack', state: 'Odisha', pincode: '753001' },
  { city: 'Guwahati', district: 'Kamrup Metropolitan', state: 'Assam', pincode: '781001' },
  { city: 'Ranchi', district: 'Ranchi', state: 'Jharkhand', pincode: '834001' },
  { city: 'Jamshedpur', district: 'East Singhbhum', state: 'Jharkhand', pincode: '831001' },
  { city: 'Raipur', district: 'Raipur', state: 'Chhattisgarh', pincode: '492001' },
  { city: 'Dehradun', district: 'Dehradun', state: 'Uttarakhand', pincode: '248001' },
  { city: 'Shimla', district: 'Shimla', state: 'Himachal Pradesh', pincode: '171001' },
  { city: 'Amritsar', district: 'Amritsar', state: 'Punjab', pincode: '143001' },
  { city: 'Ludhiana', district: 'Ludhiana', state: 'Punjab', pincode: '141001' },
  { city: 'Panaji', district: 'North Goa', state: 'Goa', pincode: '403001' },
  { city: 'Margao', district: 'South Goa', state: 'Goa', pincode: '403601' },
  { city: 'Srinagar', district: 'Srinagar', state: 'Jammu and Kashmir', pincode: '190001' },
  { city: 'Jammu', district: 'Jammu', state: 'Jammu and Kashmir', pincode: '180001' }
];

/**
 * Filter cities when user types even a single letter
 * Prioritizes startsWith, then includes.
 */
export function searchCities(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();

  const exactStart = [];
  const containsMatch = [];

  for (const item of CITIES_DATA) {
    const cLower = item.city.toLowerCase();
    if (cLower.startsWith(q)) {
      exactStart.push(item);
    } else if (cLower.includes(q) || item.district?.toLowerCase().includes(q)) {
      containsMatch.push(item);
    }
  }

  return [...exactStart, ...containsMatch].slice(0, 8);
}

/**
 * Filter states when user types even a single letter
 * e.g. 'm' -> Maharashtra, Madhya Pradesh, Manipur, Meghalaya, Mizoram
 */
export function searchStates(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();

  const exactStart = [];
  const containsMatch = [];

  for (const state of INDIAN_STATES) {
    const sLower = state.toLowerCase();
    if (sLower.startsWith(q)) {
      exactStart.push(state);
    } else if (sLower.includes(q)) {
      containsMatch.push(state);
    }
  }

  return [...exactStart, ...containsMatch].slice(0, 8);
}

/**
 * Look up location by 6-digit Pincode
 */
export function findLocationByPincode(pincode) {
  if (!pincode || pincode.trim().length !== 6) return null;
  const pin = pincode.trim();
  return CITIES_DATA.find((c) => c.pincode === pin) || null;
}

/**
 * Validate match between City and Pincode
 * Returns validation status and suggestions if mismatched
 */
export function validateCityPincodeMatch(cityName, enteredPincode) {
  if (!enteredPincode || enteredPincode.trim().length === 0) {
    return { status: 'idle' };
  }

  const cleanPin = enteredPincode.trim();

  // Format check: must be 6 digits and cannot start with 0
  if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
    if (cleanPin.length === 6) {
      return {
        status: 'invalid_format',
        isValid: false,
        error: 'Invalid PIN code. Indian PIN codes must be 6 digits and cannot start with 0.'
      };
    }
    return { status: 'typing' }; // Still typing digits
  }

  // If city is specified
  if (cityName && cityName.trim().length > 0) {
    const cityClean = cityName.trim().toLowerCase();

    // Find expected entry in CITIES_DATA
    const matchedCityObj = CITIES_DATA.find(
      (c) => c.city.toLowerCase() === cityClean ||
             c.city.toLowerCase().includes(cityClean) ||
             cityClean.includes(c.city.toLowerCase())
    );

    if (matchedCityObj) {
      if (matchedCityObj.pincode === cleanPin) {
        return {
          status: 'valid',
          isValid: true,
          message: `Verified PIN code for ${matchedCityObj.city}, ${matchedCityObj.state}`
        };
      } else {
        // Mismatch!
        const pinOwner = CITIES_DATA.find((c) => c.pincode === cleanPin);
        return {
          status: 'mismatch',
          isValid: false,
          error: `PIN code ${cleanPin} does not match ${matchedCityObj.city}!`,
          correctPincode: matchedCityObj.pincode,
          city: matchedCityObj.city,
          state: matchedCityObj.state,
          pinBelongsTo: pinOwner ? `${pinOwner.city} (${pinOwner.state})` : null,
          suggestion: `Correct PIN code for ${matchedCityObj.city} is ${matchedCityObj.pincode}`
        };
      }
    }
  }

  // If city is not yet entered, detect from PIN code
  const knownLocation = CITIES_DATA.find((c) => c.pincode === cleanPin);
  if (knownLocation) {
    return {
      status: 'detected_city',
      isValid: true,
      detectedLocation: knownLocation,
      message: `Detected: ${knownLocation.city}, ${knownLocation.state}`
    };
  }

  return { status: 'unknown_valid_format', isValid: true };
}
