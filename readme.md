CCSF Online Map

To include all the campuses.

Allow user to search by building name.

Get relevant information into OpenStreetMap while maintaining copies of other
relevant data.

Points for each campus to be used as labels at higher zoom levels are in a
shapes directory.



Technology used:
- HTML, CSS, JavaScript
- Bower, to install and manage the web stuff
- Leaflet.js to show a map
- Jquery-ui and jquery to mess around with the DOM and make simple nice looking
  things
- Other stuff depending on what is wanted
  Most of the data is based off of data in OpenStreetMap with some supplemental files in the shapes folder.



To Do's,
- Document workflow, how to requisite data out of OSM and into project or create
  supplemental datasets for which the data doesn't really make sense to add to
  OSM.
- Create a initial launch page similar to bootmap but built from scratch
- Fill in each campus dropdown with relevant info, such as buildings for each
  campus
- Create a data set of offices or other important campus features



CCSF civic Center campus

Admissions office
Library lobby
Bookstore 4th fl
Student lounge


CCSF downtown campus
 Library second floor
 admission office security ground fl
 bookstore on groundfloor,
 8th floor lounge
 Bathrooms up floor
 Restaurant in entrance

Evans Campus
  Lots of shop and heavy machinery.

  Issues of students showing up and not knowing where to go

John Adams
  Forth fl not accessible by elevator
  Gym done but over health services

  annex is not compliant so there's no student services in there


Mission Campus
  library, and

Southeast Center
  shares dean with Evans and they are not a campus but a Center


Try and figure out site vs center
  So for a CCSF location to describe itself as a Campus is should have certain student services like an admissions/bursars office and an adequate amount of onsite student counseling services.


CCSF Facilities planning info session
  - Ask highly paid consultants for information






Examples for dropdown menu list items to not data in this project

      <li><a href="data/parksInfo.geojson" download="parksInfo.geojson" target="_blank" data-toggle="collapse" data-target=".navbar-collapse.in"><i class="fa fa-download"></i>&nbsp;&nbsp;ocean</a></li>
      <li><a href="data/camps.geojson" download="camps.geojson" target="_blank" data-toggle="collapse" data-target=".navbar-collapse.in"><i class="fa fa-download"></i>&nbsp;&nbsp;Campsites</a></li>
