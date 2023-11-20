import { join } from 'path'

export const BASE_URL = process.env.BASE_URL;
const IMAGE_URL = process.env.IMAGE_URL


const ImageConstant = {
    NURSING_HOME_IMAGE_MAKE_DIRECTORY: join(__dirname, '../..', 'img/nursinghome/:uid',),
    NURSING_HOME_THUMBNAIL_MAKE_DIRECTORY: join(__dirname, '../..', 'img/nursinghome/:uid/thumbnail'),
    CAREGIVER_IMAGE_MAKE_DIRECTORY: join(__dirname, '../..', 'img/caregiver/:uid',),
    CAREGIVER_THUMBNAIL_MAKE_DIRECTORY: join(__dirname, '../..', 'img/caregiver/:uid/thumbnail'),
    IMAGE: `${IMAGE_URL}/:type/:uid/:filename`,
    THUMBNAIL: `${IMAGE_URL}/:type/:uid/thumbnail/:filename`,
}

export default {
    ...ImageConstant
}