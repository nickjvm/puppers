function normalizeData (data) {
    return {
        lastOffset: data.lastOffset ? data.lastOffset.$t : 0,
        pets: data.pets ? data.pets.pet.map(pet => {
            return {
                name: pet.name.$t,
                image: pet.media.photos.photo.filter(image => {
                    return image['@size'] === 'pn'
                  })[0].$t,
                id: pet.id.$t
            }
        }) : []
    }
}

module.exports = normalizeData;
