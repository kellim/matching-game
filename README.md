# matching-game
Responsive matching game using JQuery / JavaScript, Bootstrap, and Knockout

# Tasks To Do
- Add backs for tiles and display backs of tiles initially
- Start a new turn
  - Let player pick first tile
  - Display image of tile picked in place of back of tile
  - Write name of first tile picked to screen
  - Let player pick second tile
  - Display image of second tile picked in place of back of tile
  - Write name of second tile picked to screen
- Compare first and second tiles picked to see if they match
  - If no match found
    - Indicate no match found
    - Turn cards back over by showing back of tile instead of tile image
    - Let player start a new turn
- If match found
    - Indicate match found
    - Do not display tiles or backs of tiles at location where match was found
    - Let player start a new turn   
- Display 'Number of Matches Found' on screen (or matches left to find?)
- End Game when all Matches found
  - Display a congratulatory message when game has been won
  - Invite user to play a new game
    - If player chooses to play new game, initiate the game so it starts over
- Add header with title to page
- Future enhancements include allowing user to select the type of image to match (add something besides ducks), also let user select their own images and use local storage to hold them.

# Resources
- [Knockout Documentation](http://knockoutjs.com)
- [Bootstrap Documentation](http://getbootstrap.com)
- [jQuery Documentation](http://api.jquery.com)
- [Underscore Documentation](http://underscorejs.org)
- [U.S. Fish and Wildlife Service](http://digitalmedia.fws.gov/) - all duck images for this game are public domain and were obtained from this site.
