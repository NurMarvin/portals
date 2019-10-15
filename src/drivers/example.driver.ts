import Portal from '../models/portal'

// Import the API you wish to use
import { createClient } from '../config/providers/example.config'
import { closePortal } from './portal.driver'

const client = createClient()

export const openPortalInstance = async (portal: Portal) => {
    const name = `portal-${portal.id}`

    try {
        // Create the server using the API & Provider of your choice
        await client.createServer()
        await portal.updateStatus('starting')

        console.log(`opened portal with name ${name}`)
    } catch(error) {
        closePortal(portal.id)

        console.error('error while opening portal', error)
    }
}

export const closePortalInstance = async (portal: Portal) => {
    const name = `portal-${portal.id}`, { serverId } = portal

    try {
        // Destroy the server using the id of the server you stored when creating the server
        await client.destroyServer()

        console.log(`closed portal with name ${name}`)
    } catch(error) {
        console.error('error while closing portal', error.response ? error.response.body : error)
    }
}