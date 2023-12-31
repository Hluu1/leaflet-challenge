# leaflet-challenge

Background:
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualise their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualise USGS data that will allow them to better educate the public and other government organisations (and hopefully secure more funding) on issues facing our planet.

Part 1: Create the Earthquake Visualisation
      The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON [FeedLinks to an external site](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php). page        and choose a dataset to visualise. In this case, I chose the data set of "Past days - all earthquakes."
      Using Leaflet, create a map that plots all the earthquakes from your dataset based on their longitude and latitude.
      Your data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by colour. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth     
      should appear darker in colour.
      
Part 2: Gather and Plot More Data
      Plot a second dataset on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in this dataset and visualise it alongside your original data. Data on tectonic 
      plates can be found at https://github.com/fraxen/tectonicplatesLinks. 
      Plot the tectonic plates dataset on the map in addition to the earthquakes.
      Add other base maps to choose from.
      Put each dataset into separate overlays that can be turned on and off independently.
      Add layer controls to your map.
