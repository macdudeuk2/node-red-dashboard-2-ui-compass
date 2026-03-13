module.exports = function (RED) {
    function UICompassNode (config) {
        RED.nodes.createNode(this, config)

        const node = this

        const group = RED.nodes.getNode(config.group)

        if (!group) {
            node.error('No group configured')
            return
        }

        const base = group.getBase()

        const evts = {
            onAction: true,
            beforeSend: function (msg) {
                let heading = msg.payload

                if (typeof heading === 'string') {
                    heading = parseFloat(heading)
                }

                if (typeof heading !== 'number' || isNaN(heading)) {
                    node.warn('Invalid heading value: ' + msg.payload)
                    return null
                }

                heading = ((heading % 360) + 360) % 360
                msg.payload = heading

                return msg
            },
            onInput: function (msg, send, done) {
                base.stores.data.save(base, node, msg)
                send(msg)
            }
        }

        group.register(node, config, evts)
    }

    RED.nodes.registerType('ui-compass', UICompassNode)
}
