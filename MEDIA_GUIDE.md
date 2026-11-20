# Media Drop-In Guide (Icons, Screenshots & Screen Recordings)

Drop your assets into `public/media/<app>/` and rebuild or push—the site automatically detects and displays them with zero code edits.

## Folder Map

- `public/media/trustfall/`
- `public/media/biteary/`
- `public/media/beeep/`
- `public/media/mynapoli/`
- `public/media/superherofit/`

## Supported Filenames

| Filename | Automatic Behavior |
| :--- | :--- |
| `icon.png` *(or `.webp`)* | Shown as the app's squircle icon across the portfolio. |
| `icon-dark.png` | Automatically displayed in Dark Mode and in the App Icons section on the project page. |
| `icon-tinted.png` | Displayed alongside Default and Dark icons on the project page. |
| `demo.mp4` *(or `demo.webm`)* | Plays cleanly on the home card and project page (muted, controls enabled, lazy-loaded below the fold). |
| `demo-poster.png` *(optional)* | Poster frame for `demo.mp4` (defaults to `screen-1.png` if omitted). |
| `screen-1.png`, `screen-2.png`, ... | Populates the screenshot gallery with click-to-zoom preview (`screen-1.png` is also shown on the home card when no video is present). |

## Recording from Xcode iOS Simulator

```bash
xcrun simctl io booted recordVideo --codec=h264 public/media/biteary/demo.mp4
```

Press `Ctrl + C` to finish recording. Capture screenshots with `Cmd + S` in Simulator.
