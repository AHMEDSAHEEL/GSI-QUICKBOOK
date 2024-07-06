document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const xButton = document.querySelector('.X');

    function handleResize() {
        if (window.innerWidth < 810) {
            hamburger.style.display = "block";
            xButton.style.display = "none";
            hamburger.addEventListener('click', function () {
                navLinks.classList.add('active');
                hamburger.style.display = "none";
                xButton.style.display = "block";
            });

            xButton.addEventListener('click', function () {
                navLinks.classList.remove('active');
                hamburger.style.display = "block";
                xButton.style.display = "none";
            });
        } else {
            hamburger.style.display = "none";
            xButton.style.display = "none";
            navLinks.classList.remove('active');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function initially to set the correct display

    const map = L.map('map').setView([20.5937, 78.9629], 5); // Default map view for India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    
    const turfs = [

        // Tamil Nadu
        { name: 'Turf Chennai A', location: [13.0827, 80.2707], city: 'Chennai', state: 'Tamil Nadu', locationPlace: { name: 'Anna Nagar', coordinates: [13.0837, 80.2100] }, distance: 5, timeSlots: ['morning', 'night'] },
        { name: 'Turf Chennai B', location: [13.0827, 80.2707], city: 'Chennai', state: 'Tamil Nadu', locationPlace: { name: 'T Nagar', coordinates: [13.0348, 80.2487] }, distance: 9, timeSlots: ['afternoon', 'evening', 'midnight']},
        { name: 'Turf Coimbatore A', location: [11.0168, 76.9558], city: 'Coimbatore', state: 'Tamil Nadu', locationPlace: { name: 'Gandhipuram', coordinates: [11.0183, 76.9746] }, distance: 6, timeSlots: ['morning', 'night'] },
        { name: 'Turf Coimbatore B', location: [11.0168, 76.9558], city: 'Coimbatore', state: 'Tamil Nadu', locationPlace: { name: 'RS Puram', coordinates: [11.0052, 76.9665] }, distance: 10, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Madurai A', location: [9.9252, 78.1198], city: 'Madurai', state: 'Tamil Nadu', locationPlace: { name: 'Anna Nagar', coordinates: [9.9001, 78.0990] }, distance: 7, timeSlots: ['evening', 'night'] },
        { name: 'Turf Madurai B', location: [9.9252, 78.1198], city: 'Madurai', state: 'Tamil Nadu', locationPlace: { name: 'Goripalayam', coordinates: [9.9276, 78.1169] }, distance: 11, timeSlots: ['night', 'morning'] },
        { name: 'Turf Tiruchirappalli A', location: [10.7905, 78.7047], city: 'Tiruchirappalli', state: 'Tamil Nadu', locationPlace: { name: 'Thillai Nagar', coordinates: [10.8059, 78.6906] }, distance: 8, timeSlots: ['morning', 'afternoon'] },
        { name: 'Turf Tiruchirappalli B', location: [10.7905, 78.7047], city: 'Tiruchirappalli', state: 'Tamil Nadu', locationPlace: { name: 'Cantonment', coordinates: [10.8055, 78.6852] }, distance: 12, timeSlots: ['afternoon', 'evening', 'night', 'midnight'] },
        { name: 'Turf Salem A', location: [11.6643, 78.1460], city: 'Salem', state: 'Tamil Nadu', locationPlace: { name: 'Fairlands', coordinates: [11.6723, 78.1464] }, distance: 6, timeSlots: ['evening', 'night'] },
        { name: 'Turf Salem B', location: [11.6643, 78.1460], city: 'Salem', state: 'Tamil Nadu', locationPlace: { name: 'Shevapet', coordinates: [11.6683, 78.1516] }, distance: 10, timeSlots: ['night', 'morning'] },
        { name: 'Green Field Turf', location: [8.1802, 77.4344], city: 'Nagercoil', state: 'Tamil Nadu', locationPlace: { name: 'Thittuvilai', coordinates: [8.2733, 77.4400] }, distance: 5, timeSlots: ['morning', 'afternoon', 'evening'] },
        { name: 'Victory Sports Turf', location: [8.1792, 77.4354], city: 'Nagercoil', state: 'Tamil Nadu', locationPlace: { name: 'Kottar', coordinates: [8.1806, 77.4462] }, distance: 4, timeSlots: ['morning', 'evening'] },
        { name: 'Star Turf', location: [8.1822, 77.4304], city: 'Nagercoil', state: 'Tamil Nadu', locationPlace: { name: 'Vadasery', coordinates: [8.1741, 77.4264] }, distance: 3, timeSlots: ['morning', 'afternoon'] },

        //Maharatra
        { name: 'Turf Mumbai A', location: [19.0760, 72.8777], city: 'Mumbai', state: 'Maharashtra', locationPlace: { name: 'Worli', coordinates: [19.0144, 72.8162] }, distance: 8, timeSlots: ['morning', 'night', 'afternoon'] },
        { name: 'Turf Mumbai B', location: [19.0760, 72.8777], city: 'Mumbai', state: 'Maharashtra', locationPlace: { name: 'Juhu', coordinates: [19.0975, 72.8265] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Pune A', location: [18.5204, 73.8567], city: 'Pune', state: 'Maharashtra', locationPlace: { name: 'Kothrud', coordinates: [18.5039, 73.8077] }, distance: 10, timeSlots: ['evening', 'morning', 'midnight'] },
        { name: 'Turf Pune B', location: [18.5204, 73.8567], city: 'Pune', state: 'Maharashtra', locationPlace: { name: 'Hinjawadi', coordinates: [18.5915, 73.7388] }, distance: 15, timeSlots: ['night', 'afternoon', 'morning', 'evening'] },
        { name: 'Turf Nagpur A', location: [21.1458, 79.0882], city: 'Nagpur', state: 'Maharashtra', locationPlace: { name: 'Dharampeth', coordinates: [21.1330, 79.0636] }, distance: 8, timeSlots: ['morning', 'afternoon', 'evening'] },
        { name: 'Turf Nagpur B', location: [21.1458, 79.0882], city: 'Nagpur', state: 'Maharashtra', locationPlace: { name: 'Sadar', coordinates: [21.1522, 79.0878] }, distance: 12, timeSlots: ['afternoon', 'evening', 'night', 'midnight'] },
        { name: 'Turf Nashik A', location: [19.9975, 73.7898], city: 'Nashik', state: 'Maharashtra', locationPlace: { name: 'College Road', coordinates: [19.9986, 73.7895] }, distance: 6, timeSlots: ['evening', 'night', 'morning'] },
        { name: 'Turf Nashik B', location: [19.9975, 73.7898], city: 'Nashik', state: 'Maharashtra', locationPlace: { name: 'Indira Nagar', coordinates: [20.0119, 73.7728] }, distance: 10, timeSlots: ['night', 'morning'] },
        { name: 'Turf Aurangabad A', location: [19.8762, 75.3433], city: 'Aurangabad', state: 'Maharashtra', locationPlace: { name: 'Garkheda', coordinates: [19.8880, 75.3409] }, distance: 7, timeSlots: ['morning', 'afternoon', 'evening'] },
        { name: 'Turf Aurangabad B', location: [19.8762, 75.3433], city: 'Aurangabad', state: 'Maharashtra', locationPlace: { name: 'Cidco', coordinates: [19.8956, 75.3584] }, distance: 11, timeSlots: ['afternoon', 'evening', 'night', 'midnight'] },// Karnataka
        { name: 'Turf Bangalore A', location: [12.9716, 77.5946], city: 'Bangalore', state: 'Karnataka', locationPlace: { name: 'Indiranagar', coordinates: [12.9733, 77.6405] }, distance: 7, timeSlots: ['morning', 'afternoon', 'evening'] },
        { name: 'Turf Bangalore B', location: [12.9716, 77.5946], city: 'Bangalore', state: 'Karnataka', locationPlace: { name: 'Koramangala', coordinates: [12.9352, 77.6245] }, distance: 11, timeSlots: ['afternoon', 'evening', 'night'] },
        { name: 'Turf Mysore A', location: [12.2958, 76.6394], city: 'Mysore', state: 'Karnataka', locationPlace: { name: 'Vijayanagar', coordinates: [12.3078, 76.6586] }, distance: 8, timeSlots: ['morning', 'night', 'midnight'] },
        { name: 'Turf Mysore B', location: [12.2958, 76.6394], city: 'Mysore', state: 'Karnataka', locationPlace: { name: 'Kuvempunagar', coordinates: [12.3077, 76.6444] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Mangalore A', location: [12.9141, 74.8560], city: 'Mangalore', state: 'Karnataka', locationPlace: { name: 'Hampankatta', coordinates: [12.8698, 74.8437] }, distance: 6, timeSlots: ['morning', 'night'] },
        { name: 'Turf Mangalore B', location: [12.9141, 74.8560], city: 'Mangalore', state: 'Karnataka', locationPlace: { name: 'Kadri', coordinates: [12.9006, 74.8507] }, distance: 10, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Hubli A', location: [15.3647, 75.1239], city: 'Hubli', state: 'Karnataka', locationPlace: { name: 'Vidyanagar', coordinates: [15.3652, 75.1086] }, distance: 8, timeSlots: ['morning', 'afternoon'] },
        { name: 'Turf Hubli B', location: [15.3647, 75.1239], city: 'Hubli', state: 'Karnataka', locationPlace: { name: 'Lakamanahalli', coordinates: [15.3641, 75.1150] }, distance: 12, timeSlots: ['evening', 'night'] },
        { name: 'Turf Belgaum A', location: [15.8497, 74.4977], city: 'Belgaum', state: 'Karnataka', locationPlace: { name: 'Tilakwadi', coordinates: [15.8608, 74.5064] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Belgaum B', location: [15.8497, 74.4977], city: 'Belgaum', state: 'Karnataka', locationPlace: { name: 'Shahpur', coordinates: [15.8605, 74.5060] }, distance: 11, timeSlots: ['afternoon', 'evening', 'midnight'] },


        // Delhi
        { name: 'Turf Delhi A', location: [28.6139, 77.2090], city: 'Delhi', state: 'Delhi', locationPlace: { name: 'Connaught Place', coordinates: [28.6315, 77.2167] }, distance: 5, timeSlots: ['morning', 'night', 'afternoon'] },
        { name: 'Turf Delhi B', location: [28.6139, 77.2090], city: 'Delhi', state: 'Delhi', locationPlace: { name: 'Rajouri Garden', coordinates: [28.6426, 77.1160] }, distance: 9, timeSlots: ['evening', 'night', 'afternoon'] },
        { name: 'Turf Noida A', location: [28.5355, 77.3910], city: 'Noida', state: 'Uttar Pradesh', locationPlace: { name: 'Sector 18', coordinates: [28.5733, 77.3568] }, distance: 6, timeSlots: ['morning', 'night'] },
        { name: 'Turf Noida B', location: [28.5355, 77.3910], city: 'Noida', state: 'Uttar Pradesh', locationPlace: { name: 'Sector 62', coordinates: [28.6083, 77.3644] }, distance: 10, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Gurugram A', location: [28.4595, 77.0266], city: 'Gurugram', state: 'Haryana', locationPlace: { name: 'Cyber City', coordinates: [28.4947, 77.0889] }, distance: 8, timeSlots: ['morning', 'afternoon'] },
        { name: 'Turf Gurugram B', location: [28.4595, 77.0266], city: 'Gurugram', state: 'Haryana', locationPlace: { name: 'Sector 29', coordinates: [28.4676, 77.0821] }, distance: 12, timeSlots: ['evening', 'night'] },
        { name: 'Turf Ghaziabad A', location: [28.6692, 77.4538], city: 'Ghaziabad', state: 'Uttar Pradesh', locationPlace: { name: 'Vaishali', coordinates: [28.6470, 77.3384] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Ghaziabad B', location: [28.6692, 77.4538], city: 'Ghaziabad', state: 'Uttar Pradesh', locationPlace: { name: 'Indirapuram', coordinates: [28.6415, 77.3712] }, distance: 11, timeSlots: ['afternoon', 'evening', 'midnight'] },
        { name: 'Turf Faridabad A', location: [28.4089, 77.3178], city: 'Faridabad', state: 'Haryana', locationPlace: { name: 'Sector 15', coordinates: [28.3722, 77.3076] }, distance: 6, timeSlots: ['morning', 'night'] },
        { name: 'Turf Faridabad B', location: [28.4089, 77.3178], city: 'Faridabad', state: 'Haryana', locationPlace: { name: 'Sector 12', coordinates: [28.3831, 77.3079] }, distance: 10, timeSlots: ['afternoon', 'evening'] },
        // Andhra Pradesh
        { name: 'Turf Hyderabad A', location: [17.3850, 78.4867], city: 'Hyderabad', state: 'Telangana', locationPlace: { name: 'Banjara Hills', coordinates: [17.4150, 78.4340] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Hyderabad B', location: [17.3850, 78.4867], city: 'Hyderabad', state: 'Telangana', locationPlace: { name: 'Gachibowli', coordinates: [17.4436, 78.3510] }, distance: 11, timeSlots: ['afternoon', 'evening', 'midnight'] },
        { name: 'Turf Hyderabad A', location: [17.3850, 78.4867], city: 'Hyderabad', state: 'Telangana', locationPlace: { name: 'Banjara Hills', coordinates: [17.4150, 78.4340] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Hyderabad B', location: [17.3850, 78.4867], city: 'Hyderabad', state: 'Telangana', locationPlace: { name: 'Gachibowli', coordinates: [17.4436, 78.3510] }, distance: 11, timeSlots: ['afternoon', 'evening', 'midnight'] },
        { name: 'Turf Vijayawada A', location: [16.5062, 80.6480], city: 'Vijayawada', state: 'Andhra Pradesh', locationPlace: { name: 'Benz Circle', coordinates: [16.5148, 80.6252] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Vijayawada B', location: [16.5062, 80.6480], city: 'Vijayawada', state: 'Andhra Pradesh', locationPlace: { name: 'Patamata', coordinates: [16.5109, 80.6373] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Visakhapatnam A', location: [17.6868, 83.2185], city: 'Visakhapatnam', state: 'Andhra Pradesh', locationPlace: { name: 'Dwaraka Nagar', coordinates: [17.7316, 83.3082] }, distance: 6, timeSlots: ['morning', 'night'] },
        { name: 'Turf Visakhapatnam B', location: [17.6868, 83.2185], city: 'Visakhapatnam', state: 'Andhra Pradesh', locationPlace: { name: 'Beach Road', coordinates: [17.7175, 83.3078] }, distance: 10, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Guntur A', location: [16.3067, 80.4365], city: 'Guntur', state: 'Andhra Pradesh', locationPlace: { name: 'Brodipet', coordinates: [16.3140, 80.4354] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Guntur B', location: [16.3067, 80.4365], city: 'Guntur', state: 'Andhra Pradesh', locationPlace: { name: 'Arundelpet', coordinates: [16.3061, 80.4424] }, distance: 12, timeSlots: ['afternoon', 'evening', 'midnight'] },
        { name: 'Turf Nellore A', location: [14.4426, 79.9865], city: 'Nellore', state: 'Andhra Pradesh', locationPlace: { name: 'Gandhi Nagar', coordinates: [14.4543, 79.9923] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Nellore B', location: [14.4426, 79.9865], city: 'Nellore', state: 'Andhra Pradesh', locationPlace: { name: 'Brindavanam', coordinates: [14.4567, 79.9869] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        // Kerala
        { name: 'Turf Kochi A', location: [9.9312, 76.2673], city: 'Kochi', state: 'Kerala', locationPlace: { name: 'Panampilly Nagar', coordinates: [9.9627, 76.2877] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Kochi B', location: [9.9312, 76.2673], city: 'Kochi', state: 'Kerala', locationPlace: { name: 'Edappally', coordinates: [10.0230, 76.3060] }, distance: 11, timeSlots: ['afternoon', 'evening', 'midnight'] },
        { name: 'Turf Thiruvananthapuram A', location: [8.5241, 76.9366], city: 'Thiruvananthapuram', state: 'Kerala', locationPlace: { name: 'Kowdiar', coordinates: [8.5244, 76.9620] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Thiruvananthapuram B', location: [8.5241, 76.9366], city: 'Thiruvananthapuram', state: 'Kerala', locationPlace: { name: 'Pettah', coordinates: [8.4932, 76.9484] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Kozhikode A', location: [11.2588, 75.7804], city: 'Kozhikode', state: 'Kerala', locationPlace: { name: 'Mavoor Road', coordinates: [11.2553, 75.7896] }, distance: 6, timeSlots: ['morning', 'night'] },
        { name: 'Turf Kozhikode B', location: [11.2588, 75.7804], city: 'Kozhikode', state: 'Kerala', locationPlace: { name: 'Mananchira', coordinates: [11.2547, 75.7755] }, distance: 10, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Kannur A', location: [11.8768, 75.3737], city: 'Kannur', state: 'Kerala', locationPlace: { name: 'Kannur Town', coordinates: [11.8672, 75.3557] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Kannur B', location: [11.8768, 75.3737], city: 'Kannur', state: 'Kerala', locationPlace: { name: 'Thavakkara', coordinates: [11.8655, 75.3596] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        // Rajasthan
        { name: 'Turf Jaipur A', location: [26.9124, 75.7873], city: 'Jaipur', state: 'Rajasthan', locationPlace: { name: 'MI Road', coordinates: [26.9162, 75.8204] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Jaipur B', location: [26.9124, 75.7873], city: 'Jaipur', state: 'Rajasthan', locationPlace: { name: 'Vaishali Nagar', coordinates: [26.9118, 75.7380] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Udaipur A', location: [24.5854, 73.7125], city: 'Udaipur', state: 'Rajasthan', locationPlace: { name: 'City Palace', coordinates: [24.5765, 73.6839] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Udaipur B', location: [24.5854, 73.7125], city: 'Udaipur', state: 'Rajasthan', locationPlace: { name: 'Fateh Sagar Lake', coordinates: [24.6014, 73.6837] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Jodhpur A', location: [26.2389, 73.0243], city: 'Jodhpur', state: 'Rajasthan', locationPlace: { name: 'Mehrangarh Fort', coordinates: [26.2984, 73.0180] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Jodhpur B', location: [26.2389, 73.0243], city: 'Jodhpur', state: 'Rajasthan', locationPlace: { name: 'Umaid Bhawan Palace', coordinates: [26.2889, 73.0483] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Ajmer A', location: [26.4499, 74.6399], city: 'Ajmer', state: 'Rajasthan', locationPlace: { name: 'Ajmer Sharif Dargah', coordinates: [26.4609, 74.6339] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Ajmer B', location: [26.4499, 74.6399], city: 'Ajmer', state: 'Rajasthan', locationPlace: { name: 'Ana Sagar Lake', coordinates: [26.4624, 74.6237] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Kota A', location: [25.2138, 75.8648], city: 'Kota', state: 'Rajasthan', locationPlace: { name: 'Seven Wonders Park', coordinates: [25.2126, 75.8537] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Kota B', location: [25.2138, 75.8648], city: 'Kota', state: 'Rajasthan', locationPlace: { name: 'Chambal Garden', coordinates: [25.1855, 76.1363] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Punjab
        { name: 'Turf Amritsar A', location: [31.6340, 74.8723], city: 'Amritsar', state: 'Punjab', locationPlace: { name: 'Golden Temple', coordinates: [31.6200, 74.8765] }, distance: 6, timeSlots: ['morning', 'night'] },
        { name: 'Turf Amritsar B', location: [31.6340, 74.8723], city: 'Amritsar', state: 'Punjab', locationPlace: { name: 'Jallianwala Bagh', coordinates: [31.6215, 74.8763] }, distance: 10, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Ludhiana A', location: [30.9010, 75.8573], city: 'Ludhiana', state: 'Punjab', locationPlace: { name: 'Punjab Agricultural University', coordinates: [30.8700, 75.8367] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Ludhiana B', location: [30.9010, 75.8573], city: 'Ludhiana', state: 'Punjab', locationPlace: { name: 'Nehru Rose Garden', coordinates: [30.9177, 75.8443] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Patiala A', location: [30.3398, 76.3869], city: 'Patiala', state: 'Punjab', locationPlace: { name: 'Qila Mubarak Complex', coordinates: [30.3367, 76.4040] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Patiala B', location: [30.3398, 76.3869], city: 'Patiala', state: 'Punjab', locationPlace: { name: 'Sheesh Mahal', coordinates: [30.3342, 76.4025] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Jalandhar A', location: [31.3260, 75.5762], city: 'Jalandhar', state: 'Punjab', locationPlace: { name: 'Devi Talab Mandir', coordinates: [31.3305, 75.5775] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Jalandhar B', location: [31.3260, 75.5762], city: 'Jalandhar', state: 'Punjab', locationPlace: { name: 'Wonderland Theme Park', coordinates: [31.2922, 75.5925] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Bathinda A', location: [30.2110, 74.9455], city: 'Bathinda', state: 'Punjab', locationPlace: { name: 'Qila Mubarak', coordinates: [30.2086, 74.9450] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Bathinda B', location: [30.2110, 74.9455], city: 'Bathinda', state: 'Punjab', locationPlace: { name: 'Rose Garden', coordinates: [30.2185, 74.9457] }, distance: 12, timeSlots: ['afternoon', 'evening'] },

        // Madhya Pradesh
        { name: 'Turf Bhopal A', location: [23.2599, 77.4126], city: 'Bhopal', state: 'Madhya Pradesh', locationPlace: { name: 'Upper Lake', coordinates: [23.2475, 77.4100] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Bhopal B', location: [23.2599, 77.4126], city: 'Bhopal', state: 'Madhya Pradesh', locationPlace: { name: 'Bhojpur Temple', coordinates: [23.2164, 77.4242] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Indore A', location: [22.7196, 75.8577], city: 'Indore', state: 'Madhya Pradesh', locationPlace: { name: 'Rajwada Palace', coordinates: [22.7191, 75.8573] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Indore B', location: [22.7196, 75.8577], city: 'Indore', state: 'Madhya Pradesh', locationPlace: { name: 'Sarafa Bazar', coordinates: [22.7171, 75.8570] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Gwalior A', location: [26.2183, 78.1828], city: 'Gwalior', state: 'Madhya Pradesh', locationPlace: { name: 'Gwalior Fort', coordinates: [26.2290, 78.1681] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Gwalior B', location: [26.2183, 78.1828], city: 'Gwalior', state: 'Madhya Pradesh', locationPlace: { name: 'Jai Vilas Palace', coordinates: [26.2098, 78.1724] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Jabalpur A', location: [23.1815, 79.9864], city: 'Jabalpur', state: 'Madhya Pradesh', locationPlace: { name: 'Dhuandhar Falls', coordinates: [23.2143, 79.9825] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Jabalpur B', location: [23.1815, 79.9864], city: 'Jabalpur', state: 'Madhya Pradesh', locationPlace: { name: 'Bhedaghat Marble Rocks', coordinates: [23.2071, 79.8508] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Ujjain A', location: [23.1793, 75.7850], city: 'Ujjain', state: 'Madhya Pradesh', locationPlace: { name: 'Mahakaleshwar Temple', coordinates: [23.1832, 75.7776] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Ujjain B', location: [23.1793, 75.7850], city: 'Ujjain', state: 'Madhya Pradesh', locationPlace: { name: 'Kal Bhairav Temple', coordinates: [23.1774, 75.7767] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Gujarat
        { name: 'Turf Ahmedabad A', location: [23.0225, 72.5714], city: 'Ahmedabad', state: 'Gujarat', locationPlace: { name: 'Sabarmati Ashram', coordinates: [23.0270, 72.5849] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Ahmedabad B', location: [23.0225, 72.5714], city: 'Ahmedabad', state: 'Gujarat', locationPlace: { name: 'Kankaria Lake', coordinates: [23.0019, 72.6028] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Surat A', location: [21.1702, 72.8311], city: 'Surat', state: 'Gujarat', locationPlace: { name: 'Dumas Beach', coordinates: [21.1538, 72.7869] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Surat B', location: [21.1702, 72.8311], city: 'Surat', state: 'Gujarat', locationPlace: { name: 'ISKCON Temple', coordinates: [21.1683, 72.8171] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Vadodara A', location: [22.3072, 73.1812], city: 'Vadodara', state: 'Gujarat', locationPlace: { name: 'Laxmi Vilas Palace', coordinates: [22.3145, 73.1756] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Vadodara B', location: [22.3072, 73.1812], city: 'Vadodara', state: 'Gujarat', locationPlace: { name: 'Sayaji Baug', coordinates: [22.3041, 73.1857] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Rajkot A', location: [22.3046, 70.8021], city: 'Rajkot', state: 'Gujarat', locationPlace: { name: 'Watson Museum', coordinates: [22.2971, 70.7993] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Rajkot B', location: [22.3046, 70.8021], city: 'Rajkot', state: 'Gujarat', locationPlace: { name: 'Pradyuman Zoological Park', coordinates: [22.3148, 70.7976] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Bhavnagar A', location: [21.7645, 72.1519], city: 'Bhavnagar', state: 'Gujarat', locationPlace: { name: 'Takhteshwar Temple', coordinates: [21.7737, 72.1515] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Bhavnagar B', location: [21.7645, 72.1519], city: 'Bhavnagar', state: 'Gujarat', locationPlace: { name: 'Victoria Park', coordinates: [21.7731, 72.1467] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Uttar Pradesh
        { name: 'Turf Lucknow A', location: [26.8467, 80.9462], city: 'Lucknow', state: 'Uttar Pradesh', locationPlace: { name: 'Bara Imambara', coordinates: [26.8802, 80.9023] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Lucknow B', location: [26.8467, 80.9462], city: 'Lucknow', state: 'Uttar Pradesh', locationPlace: { name: 'Hazratganj Market', coordinates: [26.8504, 80.9458] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Kanpur A', location: [26.4499, 80.3319], city: 'Kanpur', state: 'Uttar Pradesh', locationPlace: { name: 'Phool Bagh', coordinates: [26.4598, 80.3201] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Kanpur B', location: [26.4499, 80.3319], city: 'Kanpur', state: 'Uttar Pradesh', locationPlace: { name: 'JK Temple', coordinates: [26.4912, 80.2754] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Agra A', location: [27.1767, 78.0081], city: 'Agra', state: 'Uttar Pradesh', locationPlace: { name: 'Taj Mahal', coordinates: [27.1750, 78.0422] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Agra B', location: [27.1767, 78.0081], city: 'Agra', state: 'Uttar Pradesh', locationPlace: { name: 'Agra Fort', coordinates: [27.1760, 78.0217] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Varanasi A', location: [25.3176, 82.9739], city: 'Varanasi', state: 'Uttar Pradesh', locationPlace: { name: 'Kashi Vishwanath Temple', coordinates: [25.3109, 83.0224] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Varanasi B', location: [25.3176, 82.9739], city: 'Varanasi', state: 'Uttar Pradesh', locationPlace: { name: 'Dashashwamedh Ghat', coordinates: [25.3053, 83.0107] }, distance: 12, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Meerut A', location: [28.9845, 77.7064], city: 'Meerut', state: 'Uttar Pradesh', locationPlace: { name: 'Augarnath Temple', coordinates: [28.9934, 77.7053] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Meerut B', location: [28.9845, 77.7064], city: 'Meerut', state: 'Uttar Pradesh', locationPlace: { name: 'St. John\'s Church', coordinates: [28.9938, 77.7097] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Andaman and Nicobar Islands
        { name: 'Turf Port Blair A', location: [11.6234, 92.7265], city: 'Port Blair', state: 'Andaman and Nicobar Islands', locationPlace: { name: 'Cellular Jail', coordinates: [11.6780, 92.7415] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Port Blair B', location: [11.6234, 92.7265], city: 'Port Blair', state: 'Andaman and Nicobar Islands', locationPlace: { name: 'Corbyn\'s Cove Beach', coordinates: [11.7006, 92.7175] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Chandigarh
        { name: 'Turf Chandigarh A', location: [30.7333, 76.7794], city: 'Chandigarh', state: 'Chandigarh', locationPlace: { name: 'Rock Garden', coordinates: [30.7522, 76.8101] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Chandigarh B', location: [30.7333, 76.7794], city: 'Chandigarh', state: 'Chandigarh', locationPlace: { name: 'Sukhna Lake', coordinates: [30.7401, 76.7988] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Dadra and Nagar Haveli and Daman and Diu
        { name: 'Turf Silvassa A', location: [20.2739, 73.0077], city: 'Silvassa', state: 'Dadra and Nagar Haveli and Daman and Diu', locationPlace: { name: 'Hirwa Van Gardens', coordinates: [20.2928, 72.9870] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Silvassa B', location: [20.2739, 73.0077], city: 'Silvassa', state: 'Dadra and Nagar Haveli and Daman and Diu', locationPlace: { name: 'Swaminarayan Temple', coordinates: [20.2733, 72.9925] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Lakshadweep
        { name: 'Turf Kavaratti A', location: [10.5667, 72.6167], city: 'Kavaratti', state: 'Lakshadweep', locationPlace: { name: 'Kavaratti Aquarium', coordinates: [10.5675, 72.6359] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Kavaratti B', location: [10.5667, 72.6167], city: 'Kavaratti', state: 'Lakshadweep', locationPlace: { name: 'Kavaratti Beach', coordinates: [10.5481, 72.6382] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Meghalaya
        { name: 'Turf Shillong A', location: [25.5788, 91.8933], city: 'Shillong', state: 'Meghalaya', locationPlace: { name: 'Elephant Falls', coordinates: [25.6069, 91.8876] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Shillong B', location: [25.5788, 91.8933], city: 'Shillong', state: 'Meghalaya', locationPlace: { name: 'Shillong Peak', coordinates: [25.5668, 91.8976] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Sikkim
        { name: 'Turf Gangtok A', location: [27.3389, 88.6065], city: 'Gangtok', state: 'Sikkim', locationPlace: { name: 'Nathula Pass', coordinates: [27.4310, 88.7278] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Gangtok B', location: [27.3389, 88.6065], city: 'Gangtok', state: 'Sikkim', locationPlace: { name: 'Rumtek Monastery', coordinates: [27.3962, 88.5828] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Tripura
        { name: 'Turf Agartala A', location: [23.8315, 91.2868], city: 'Agartala', state: 'Tripura', locationPlace: { name: 'Ujjayanta Palace', coordinates: [23.8290, 91.2782] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Agartala B', location: [23.8315, 91.2868], city: 'Agartala', state: 'Tripura', locationPlace: { name: 'Neermahal Palace', coordinates: [23.5637, 91.2950] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Goa
        { name: 'Turf Panaji A', location: [15.4909, 73.8278], city: 'Panaji', state: 'Goa', locationPlace: { name: 'Basilica of Bom Jesus', coordinates: [15.5007, 73.9119] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Panaji B', location: [15.4909, 73.8278], city: 'Panaji', state: 'Goa', locationPlace: { name: 'Dona Paula Beach', coordinates: [15.4694, 73.7890] }, distance: 11, timeSlots: ['afternoon', 'evening'] },
        { name: 'Turf Vasco da Gama A', location: [15.3959, 73.8157], city: 'Vasco da Gama', state: 'Goa', locationPlace: { name: 'Bogmalo Beach', coordinates: [15.3800, 73.8120] }, distance: 8, timeSlots: ['morning', 'night'] },
        { name: 'Turf Vasco da Gama B', location: [15.3959, 73.8157], city: 'Vasco da Gama', state: 'Goa', locationPlace: { name: 'Naval Aviation Museum', coordinates: [15.3921, 73.8411] }, distance: 12, timeSlots: ['afternoon', 'evening'] },

        // Manipur
        { name: 'Turf Imphal A', location: [24.8170, 93.9368], city: 'Imphal', state: 'Manipur', locationPlace: { name: 'Kangla Fort', coordinates: [24.8020, 93.9520] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Imphal B', location: [24.8170, 93.9368], city: 'Imphal', state: 'Manipur', locationPlace: { name: 'Loktak Lake', coordinates: [24.5333, 93.8517] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Nagaland
        { name: 'Turf Kohima A', location: [25.6747, 94.1100], city: 'Kohima', state: 'Nagaland', locationPlace: { name: 'War Cemetery', coordinates: [25.6850, 94.1158] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Kohima B', location: [25.6747, 94.1100], city: 'Kohima', state: 'Nagaland', locationPlace: { name: 'Kohima Museum', coordinates: [25.6823, 94.1098] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Arunachal Pradesh
        { name: 'Turf Itanagar A', location: [27.1023, 93.6928], city: 'Itanagar', state: 'Arunachal Pradesh', locationPlace: { name: 'Ita Fort', coordinates: [27.1058, 93.6225] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Itanagar B', location: [27.1023, 93.6928], city: 'Itanagar', state: 'Arunachal Pradesh', locationPlace: { name: 'Ganga Lake', coordinates: [27.1306, 93.6471] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Mizoram
        { name: 'Turf Aizawl A', location: [23.7271, 92.7176], city: 'Aizawl', state: 'Mizoram', locationPlace: { name: 'Durtlang Hills', coordinates: [23.7771, 92.7271] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Aizawl B', location: [23.7271, 92.7176], city: 'Aizawl', state: 'Mizoram', locationPlace: { name: 'Reiek Tlang', coordinates: [23.2071, 92.7271] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Puducherry
        { name: 'Turf Puducherry A', location: [11.9139, 79.8145], city: 'Puducherry', state: 'Puducherry', locationPlace: { name: 'Promenade Beach', coordinates: [11.9298, 79.8367] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Puducherry B', location: [11.9139, 79.8145], city: 'Puducherry', state: 'Puducherry', locationPlace: { name: 'Auroville', coordinates: [12.0059, 79.8106] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Chandigarh
        { name: 'Turf Chandigarh A', location: [30.7333, 76.7794], city: 'Chandigarh', state: 'Chandigarh', locationPlace: { name: 'Rock Garden', coordinates: [30.7522, 76.8101] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Chandigarh B', location: [30.7333, 76.7794], city: 'Chandigarh', state: 'Chandigarh', locationPlace: { name: 'Sukhna Lake', coordinates: [30.7401, 76.7988] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Ladakh
        { name: 'Turf Leh A', location: [34.1648, 77.5840], city: 'Leh', state: 'Ladakh', locationPlace: { name: 'Leh Palace', coordinates: [34.1672, 77.5838] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Leh B', location: [34.1648, 77.5840], city: 'Leh', state: 'Ladakh', locationPlace: { name: 'Pangong Lake', coordinates: [33.8840, 78.5480] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Jammu and Kashmir
        { name: 'Turf Srinagar A', location: [34.0837, 74.7973], city: 'Srinagar', state: 'Jammu and Kashmir', locationPlace: { name: 'Dal Lake', coordinates: [34.0837, 74.7973] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Srinagar B', location: [34.0837, 74.7973], city: 'Srinagar', state: 'Jammu and Kashmir', locationPlace: { name: 'Shankaracharya Temple', coordinates: [34.1015, 74.8367] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Himachal Pradesh
        { name: 'Turf Shimla A', location: [31.1048, 77.1734], city: 'Shimla', state: 'Himachal Pradesh', locationPlace: { name: 'The Ridge', coordinates: [31.1034, 77.1722] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Shimla B', location: [31.1048, 77.1734], city: 'Shimla', state: 'Himachal Pradesh', locationPlace: { name: 'Jakhoo Temple', coordinates: [31.1033, 77.1745] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Uttarakhand
        { name: 'Turf Dehradun A', location: [30.3165, 78.0322], city: 'Dehradun', state: 'Uttarakhand', locationPlace: { name: 'Robber\'s Cave', coordinates: [30.3967, 78.0641] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Dehradun B', location: [30.3165, 78.0322], city: 'Dehradun', state: 'Uttarakhand', locationPlace: { name: 'Sahastradhara', coordinates: [30.3428, 78.0787] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Arunachal Pradesh
        { name: 'Turf Itanagar A', location: [27.1023, 93.6928], city: 'Itanagar', state: 'Arunachal Pradesh', locationPlace: { name: 'Ita Fort', coordinates: [27.1058, 93.6225] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Itanagar B', location: [27.1023, 93.6928], city: 'Itanagar', state: 'Arunachal Pradesh', locationPlace: { name: 'Ganga Lake', coordinates: [27.1306, 93.6471] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Assam
        { name: 'Turf Guwahati A', location: [26.1445, 91.7362], city: 'Guwahati', state: 'Assam', locationPlace: { name: 'Kamakhya Temple', coordinates: [26.1584, 91.7622] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Guwahati B', location: [26.1445, 91.7362], city: 'Guwahati', state: 'Assam', locationPlace: { name: 'Assam State Museum', coordinates: [26.1777, 91.7557] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Bihar
        { name: 'Turf Patna A', location: [25.5941, 85.1376], city: 'Patna', state: 'Bihar', locationPlace: { name: 'Golghar', coordinates: [25.6206, 85.1428] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Patna B', location: [25.5941, 85.1376], city: 'Patna', state: 'Bihar', locationPlace: { name: 'Patna Museum', coordinates: [25.6132, 85.1385] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Jharkhand
        { name: 'Turf Ranchi A', location: [23.3441, 85.3096], city: 'Ranchi', state: 'Jharkhand', locationPlace: { name: 'Ranchi Lake', coordinates: [23.3742, 85.3148] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Ranchi B', location: [23.3441, 85.3096], city: 'Ranchi', state: 'Jharkhand', locationPlace: { name: 'Pahari Mandir', coordinates: [23.3880, 85.3363] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // // West Bengal
        // { name: 'Turf Kolkata A', location: [22.5726, 88.3639], city: 'Kolkata', state: 'West Bengal', locationPlace: { name: 'Victoria Memorial', coordinates: [22.5448, 88.3426] }, distance: 7, timeSlots: ['morning', 'night'] },
        // { name: 'Turf Kolkata B', location: [22.5726, 88.3639], city: 'Kolkata', state: 'West Bengal', locationPlace: { name: 'Howrah Bridge', coordinates: [22.5958, 88.3425] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Odisha
        { name: 'Turf Bhubaneswar A', location: [20.2961, 85.8245], city: 'Bhubaneswar', state: 'Odisha', locationPlace: { name: 'Lingaraja Temple', coordinates: [20.2355, 85.8340] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Bhubaneswar B', location: [20.2961, 85.8245], city: 'Bhubaneswar', state: 'Odisha', locationPlace: { name: 'Nandankanan Zoo', coordinates: [20.4006, 85.8854] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Chhattisgarh
        { name: 'Turf Raipur A', location: [21.2514, 81.6296], city: 'Raipur', state: 'Chhattisgarh', locationPlace: { name: 'Mahant Ghasidas Memorial Museum', coordinates: [21.2558, 81.6289] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Raipur B', location: [21.2514, 81.6296], city: 'Raipur', state: 'Chhattisgarh', locationPlace: { name: 'Nandan Van Zoo & Safari', coordinates: [21.2500, 81.6050] }, distance: 11, timeSlots: ['afternoon', 'evening'] },

        // Madhya Pradesh
        { name: 'Turf Bhopal A', location: [23.2599, 77.4126], city: 'Bhopal', state: 'Madhya Pradesh', locationPlace: { name: 'Upper Lake', coordinates: [23.2333, 77.4000] }, distance: 7, timeSlots: ['morning', 'night'] },
        { name: 'Turf Bhopal B', location: [23.2599, 77.4126], city: 'Bhopal', state: 'Madhya Pradesh', locationPlace: { name: 'Van Vihar National Park', coordinates: [23.2301, 77.3955] }, distance: 11, timeSlots: ['afternoon', 'evening'] }
    ];

    // Array of city names
    let cityNames = [
        "Agra", "Agartala", "Ahmedabad", "Ajmer", "Aizawl", "Amritsar", "Bangalore",
        "Bathinda", "Belgaum", "Bhopal", "Bhubaneswar", "Bhavnagar", "Chandigarh",
        "Chennai", "Coimbatore", "Dehradun", "Delhi", "Faridabad", "Gangtok", "Ghaziabad",
        "Guntur", "Guwahati", "Gwalior", "Hubli", "Hyderabad", "Imphal", "Indore", "Itanagar",
        "Jabalpur", "Jaipur", "Jalandhar", "Jodhpur", "Kanpur", "Kavaratti", "Kochi", "Kohima",
        "Kota", "Kozhikode", "Leh", "Ludhiana", "Lucknow", "Madurai", "Mangalore", "Meerut",
        "Mumbai", "Mysore", "Nagercoil", "Nagpur", "Nashik", "Nellore", "Noida", "Panaji", "patiala",
        "Patna", "Puducherry", "Pune", "Rajkot", "Ranchi", "Raipur", "Salem", "Shillong",
        "Shimla", "Silvassa", "Srinagar", "Surat", "Thiruvananthapuram", "Tiruchirappalli",
        "Udaipur", "Ujjain", "Vadodara", "Vasco da Gama", "Varanasi", "Vijayawada",
        "Visakhapatnam"
    ];

    // Sort city names alphabetically
    cityNames.sort();

    // Select element to populate
    let selectElement = document.getElementById("cityInput");

    // Clear any existing options
    selectElement.innerHTML = "";

    let firstOption = document.createElement("option");
    firstOption.textContent = "Select a city";
    firstOption.disabled = true;
    firstOption.selected = true; // Optionally make it selected by default
    selectElement.appendChild(firstOption);

    // Populate select options
    cityNames.forEach(city => {
        let option = document.createElement("option");
        option.textContent = city;
        selectElement.appendChild(option);
    });


    turfs.forEach(turf => {
        console.log(turf.city)
    })

   // Haversine formula to calculate distance
function calculateDistance(cityCoords, locationPlaceCoords) {
    const toRad = x => (x * Math.PI) / 180;

    const lat1 = cityCoords[0];
    const lon1 = cityCoords[1];
    const lat2 = locationPlaceCoords[0];
    const lon2 = locationPlaceCoords[1];

    const R = 6371; // Earth’s mean radius in km
    const dLat = toRad(lat2 - lat1);
    const dLong = toRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;

    return d.toFixed(2); // Round to the nearest kilometer
}

// Function to display turfs on the map and create cards
function displayTurfs(city, timeSlot) {
    // Find the state of the selected city
    const selectedTurf = turfs.find(turf => turf.city === city);
    if (!selectedTurf) return; // Exit if city not found

    const selectedState = selectedTurf.state;

    // Clear previous markers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Filter turfs based on state and available time slots
    const filteredTurfs = turfs.filter(turf => turf.city === city && turf.timeSlots.includes(timeSlot));

    // Add markers for filtered turfs on the map
    filteredTurfs.forEach(turf => {
        const marker = L.marker(turf.locationPlace.coordinates).addTo(map);
        marker.bindPopup(`<b>${turf.name}</b><br>Time Slots: ${turf.timeSlots.join(', ')}`).openPopup();
    });

    // Clear previous cards
    const cardContainer = document.getElementById('cardsContainer');
    cardContainer.innerHTML = '';

    // Get city coordinates (for demonstration, using predefined coordinates for the selected city)
    const cityCoordinates = selectedTurf.locationPlace.coordinates;

    // Create cards for filtered turfs
    filteredTurfs.forEach(turf => {
        const distance = calculateDistance(cityCoordinates, turf.locationPlace.coordinates);
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${turf.name}</h3>
            <p><strong>Time Slots:</strong> ${turf.timeSlots.join(', ')}</p>
            <p>Place: ${turf.locationPlace.name}</p>
            <p>Distance: ${distance} km</p>
            <p>Availability: Available</p>
            <button id="but" onclick="handlePayment('${turf.name}', ${turf.price})">BOOK</button>
        `;
        cardContainer.appendChild(card);
    });
}

// Handle form submission
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const city = document.getElementById('cityInput').value.trim();
    const timeSlot = document.getElementById('timeSlotSelect').value;

    // Display turfs based on the selected city and time slot
    displayTurfs(city, timeSlot);
});
});
