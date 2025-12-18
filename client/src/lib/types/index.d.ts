type Activity = {
    id: string
    title: string
    date: date
    description: string
    category: string
    isCancelled: boolean
    city: string
    venue: string
    latitude: number
    longitude: number
    attendees: Profile[]
    isGoing: boolean
    isHost: boolean
    hostId: string
    hostDisplayName: string
  }

  type Profile = {
    id: string
    displayName: string
    bio?: string
    imageUrl: string
  }

  type User = {
    id: string
    email: string
    displayName: string
    imageUrl?: string
  }

  type LocationIQSuggestion = {
    place_id: string
    licence: string
    osm_type: string
    osm_id: string
    boundingbox: [string]
    lat: string
    lon: string
    display_name: string
    display_place: string
    display_address: string
    class: string
    type: string
    importance: number
    icon?: string
    address: LocationIQAddress
  }

 type LocationIQAddress = {
    house_number?: string
    road?: string
    neighbourhood?: string
    suburb?: string
    city?: string
    town?: string
    village?: string
    county?: string
    state?: string
    postcode?: string
    country?: string
    country_code?: string
  }

  type LocationIQDetails = {
    place_id: string
    licence: string
    osm_type: string
    osm_id: string
    lat: string
    lon: string
    display_name: string
    address: {
      house_number?: string
      road?: string
      neighbourhood?: string
      suburb?: string
      city?: string
      county?: string
      state?: string
      postcode?: string
      country?: string
      country_code?: string
    }
    boundingbox: [string, string, string, string]
  }
