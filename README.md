# @macdudeuk/node-red-dashboard-2-ui-compass

A configurable compass widget for [Node-RED Dashboard 2.0](https://dashboard.flowfuse.com/) that displays a directional heading using a blob indicator on a ring dial.

## Features

- Clean, minimal compass dial with a blob indicator (no needle)
- Configurable cardinal point labels: none, N only, or N/E/S/W
- Configurable value display: cardinal direction, numeric degrees, both, or none
- Custom colours for the indicator blob and ring
- Adjustable ring width (labels shift inward automatically)
- Persists the last heading value across page refreshes
- Normalizes input values to the 0-360 range

## Installation

### From npm

```bash
cd ~/.node-red
npm install @macdudeuk/node-red-dashboard-2-ui-compass
```

### From a tarball

```bash
cd ~/.node-red
npm install /path/to/macdudeuk-node-red-dashboard-2-ui-compass-1.0.0.tgz
```

Restart Node-RED after installation.

## Requirements

- Node-RED >= 3.0.0
- [@flowfuse/node-red-dashboard](https://www.npmjs.com/package/@flowfuse/node-red-dashboard) >= 1.0.0
- Node.js >= 14.0.0

## Usage

1. Drag the **compass** node from the Dashboard palette onto your flow
2. Assign it to a Dashboard 2.0 group
3. Wire a node that sends a numeric `msg.payload` (degrees, 0-360)
4. Deploy and open the dashboard

## Configuration

| Property       | Description                                                      | Default     |
|----------------|------------------------------------------------------------------|-------------|
| **Group**      | Dashboard 2.0 group to render in                                 | *(required)* |
| **Label**      | Text shown above the compass                                     | `Compass`   |
| **Width**      | Widget width in grid units (1-12)                                | `3`         |
| **Height**     | Widget height in grid units                                      | `3`         |
| **Points**     | Cardinal labels on the dial: None / N only / N,E,S,W            | `NESW`      |
| **Display**    | Text below the dial: cardinal, degrees, both, or none            | `cardinal`  |
| **Indicator**  | Colour of the direction blob (default = theme primary)           | *(theme)*   |
| **Ring**       | Colour of the compass ring (default = inherited)                 | *(theme)*   |
| **Ring Width** | Stroke width of the ring (1-10)                                  | `2`         |

## Example

```
[inject (payload: 225)] --> [ui-compass]
```

The compass will show the blob pointing south-west, with "SW" displayed below the dial.

## Development

```bash
git clone https://github.com/macdudeuk2/node-red-dashboard-2-ui-compass.git
cd node-red-dashboard-2-ui-compass
npm install
npm run build
```

To install the local build into Node-RED for testing:

```bash
cd ~/.node-red
npm install /path/to/node-red-dashboard-2-ui-compass
```

Use `npm run dev` to watch for changes and rebuild automatically.

## License

[MIT](LICENSE)
