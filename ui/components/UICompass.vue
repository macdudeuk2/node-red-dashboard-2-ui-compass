<template>
    <div class="ui-compass-card">
        <div v-if="label" class="ui-compass-label">
            {{ label }}
        </div>
        <div class="ui-compass-content">
            <div class="compass-visual">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="50" r="44"
                            fill="none"
                            :stroke="ringColorResolved"
                            :stroke-width="ringWidthResolved" />

                    <template v-if="compassPointsResolved === 'N' || compassPointsResolved === 'NESW'">
                        <text x="50" :y="labelN" text-anchor="middle"
                              dominant-baseline="central"
                              font-size="10" font-weight="bold"
                              :fill="ringColorResolved">N</text>
                    </template>
                    <template v-if="compassPointsResolved === 'NESW'">
                        <text :x="labelE" y="51" text-anchor="middle"
                              dominant-baseline="central"
                              font-size="10" font-weight="bold"
                              :fill="ringColorResolved">E</text>
                        <text x="50" :y="labelS" text-anchor="middle"
                              dominant-baseline="central"
                              font-size="10" font-weight="bold"
                              :fill="ringColorResolved">S</text>
                        <text :x="labelW" y="51" text-anchor="middle"
                              dominant-baseline="central"
                              font-size="10" font-weight="bold"
                              :fill="ringColorResolved">W</text>
                    </template>

                    <circle class="compass-blob"
                            :cx="blobX" :cy="blobY" r="5"
                            :fill="blobColorResolved" />
                </svg>
            </div>

            <div v-if="showValueResolved !== 'none'" class="compass-display">
                <span v-if="showValueResolved === 'degrees' || showValueResolved === 'both'"
                      class="heading-value">{{ displayHeading }}&deg;</span>
                <span v-if="showValueResolved === 'cardinal' || showValueResolved === 'both'"
                      class="cardinal-direction">{{ cardinalDirection }}</span>
            </div>
        </div>
    </div>
</template>

<script>
const CARDINAL_16 = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
]

const BLOB_RADIUS = 44
const CENTER = 50

export default {
    name: 'UICompass',
    inject: ['$socket'],
    props: {
        id: { type: String, required: true },
        props: { type: Object, default: () => ({}) },
        state: { type: Object, default: () => ({}) }
    },
    data () {
        return {
            heading: 0
        }
    },
    computed: {
        label () {
            return this.props.label
        },
        compassPointsResolved () {
            return this.props.compassPoints || 'NESW'
        },
        showValueResolved () {
            return this.props.showValue || 'cardinal'
        },
        blobColorResolved () {
            return this.props.blobColor || 'rgb(var(--v-theme-primary))'
        },
        ringColorResolved () {
            return this.props.ringColor || 'currentColor'
        },
        ringWidthResolved () {
            const w = Number(this.props.ringWidth)
            return isNaN(w) || w < 1 ? 2 : w
        },
        labelInset () {
            return BLOB_RADIUS - this.ringWidthResolved / 2 - 8
        },
        labelN () {
            return CENTER - this.labelInset
        },
        labelS () {
            return CENTER + this.labelInset
        },
        labelE () {
            return CENTER + this.labelInset
        },
        labelW () {
            return CENTER - this.labelInset
        },
        blobX () {
            const rad = this.heading * Math.PI / 180
            return CENTER + BLOB_RADIUS * Math.sin(rad)
        },
        blobY () {
            const rad = this.heading * Math.PI / 180
            return CENTER - BLOB_RADIUS * Math.cos(rad)
        },
        displayHeading () {
            return this.heading % 1 === 0
                ? this.heading.toFixed(0)
                : this.heading.toFixed(1)
        },
        cardinalDirection () {
            const index = Math.round(this.heading / 22.5) % 16
            return CARDINAL_16[index]
        }
    },
    mounted () {
        this.$socket.on('msg-input:' + this.id, this.onInput)
        this.$socket.on('widget-load:' + this.id, this.onLoad)
        this.$socket.emit('widget-load', this.id)
    },
    unmounted () {
        this.$socket.off('msg-input:' + this.id, this.onInput)
        this.$socket.off('widget-load:' + this.id, this.onLoad)
    },
    methods: {
        onInput (msg) {
            if (msg && typeof msg.payload === 'number') {
                this.heading = msg.payload
            }
        },
        onLoad (msg) {
            if (msg && typeof msg.payload === 'number') {
                this.heading = msg.payload
            }
        }
    }
}
</script>

<style scoped>
.ui-compass-card {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}

.ui-compass-label {
    display: block;
    text-align: center;
    font-weight: bold;
    font-size: 1rem;
    padding-bottom: 4px;
    flex-shrink: 0;
}

.ui-compass-content {
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    overflow: hidden;
}

.compass-visual {
    flex: 1 1 auto;
    min-height: 0;
    max-width: 100%;
    aspect-ratio: 1;
}

.compass-visual svg {
    width: 100%;
    height: 100%;
    display: block;
}

.compass-blob {
    transition: cx 0.3s ease-out, cy 0.3s ease-out;
}

.compass-display {
    flex-shrink: 0;
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 0.25rem;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1;
}

.heading-value {
    font-variant-numeric: tabular-nums;
}

.cardinal-direction {
    font-size: 1.25rem;
    font-weight: 500;
    opacity: 0.8;
}
</style>
