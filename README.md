# Color Swatch Akkio Takehome Assessment

## How to run this app
- Ensure you have `node` installed on your computer
    - This should come with `npm` installed as well, check by doing `npm -v` once `node` has been installed
- Clone this repository
    - `git clone ... .`
- Open cloned repo on your favorite IDE
- Run `npm i` in the root of your repo
- Once installation is complete, run `npm run start` which should take you to `localhost:3000` where you can start interacting with the app

## Considerations:

- How efficiently can the distinct names be determined? 
    - Color names may be the same, even if their hex/RGB/HSL values differ slightly (e.g Chestnut Rose, I saw 6 instances). To mitigate this, we can use an object/Map to cache these values based on a combination of Saturation and Lightness values.
    - The cache allows for conditionally fetching data, so if these values already exist in the cache, we won't have to fetch again.

- Can the number of API calls be reduced?
    - Users may frequently adjust the slider (e.g they may slide saturation to 52, 53, 54) before they decide on what value. We can mitigate frequent API calls by debouncing their input.
        - This means there's a momentary pause before data is fetched. However, this debounce adds milliseconds before fetching, so it (hopefully) shouldn't cause choppy rendering and affect user experience.

- Do all colors need to be rendered at once?
    - No, it depends on the scale but virtualization can be implemented to improve the performance.
    - E.g [Virtualization](https://github.com/bvaughn/react-virtualized)

- When will the API calls be made?
    - After the user has selected their values and debouncing has completed.
    - If there are no cached responses.

- What is the best user experience for selecting S and L values?
    - I originally considered going with numeric inputs, but that can get tedious/easily prone to input the wrong number. Rather, slides make more sense for intuitively selecting saturation and lightness values.
    - An improvement to this UX would be to also allow the saturation and lightness values next to the slides be editable via inputs.
    - Also, users should see the values next to the slides real-time so it'll update as the slider gets moved.


- What sort of feedback will the user receive? How will loading times be handled?
    - Given that the API is fast, it's tough to see but we can add spinners/loading states by leveraging the `useState` hook to set a loading `boolean` while the data is being fetched -> data is fetched.
    - If there are errors, we would surface an error message to the user which is also captured thorugh a `useState` hook.
    - (Bonus) We could also keep the last successful result in case of an error and use that as a fallback.


## Potential Considerations/Improvements
- Accessibility
    - For lighter colors, it's really tough to see with a white background given the color box's opacity (lightness).
        - Could look into providing tooltips and/or utilizing a different text color(e.g black) so that it shows up with a white background
- CI/CD
    - If this project were to be productionized, we can host it as a simple page (if static).
    - If we were to consider it as a web app, we can utilize something like Google's Firebase to host, authenticate, store data via Firestore, etc.
    - If tests exist, we can set up CI pipelines (e.g GitHub Actions) to run tests on each pull request and deployments to various environments (sandbox(where devs can test), qa, staging(pre-prod), and production).
- Code Refactor/Improvements
    - The cache is currently in-memory, meaning with a refresh/server restart, we lose the previous cache values. An improvement can be made here by moving the cache logic to Local Storage and/or the Cache API (Service Workers).
    - Currently, there's only one file in the Components/ directory. This can be further broken down to individual components (e.g header/color inputs/color swatch box).