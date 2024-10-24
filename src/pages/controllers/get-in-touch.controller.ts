import { NextApiResponse } from 'next';
import GetInTouch from '../models/get-in-touch.model';
import { HttpStatus } from '../utils/http-status';
import { MailHelper } from '../utils/mail-helper';

export class GetInTouchController extends HttpStatus {
    public mailHelper = new MailHelper();

    /** POST API: Create a get in touch */
    public createGetInTouch = async (res: NextApiResponse, params: any) => {
        try {
            const getInTouch = await GetInTouch.create(params);

            if (!getInTouch) {
                return this.sendBadRequestResponse(res, "Unable to create get in touch.", getInTouch);
            }

            this.mailHelper.getInTouch(params);

            return this.sendOkResponse(res, "Thank you for reaching out to our website! Your email address has been successfully submitted.", getInTouch);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error creating get in touch.");
        }
    };

    /** GET API: Get all get in touch */
    public getAllGetInTouch = async (res: NextApiResponse) => {
        try {
            const getInTouch = await GetInTouch.findAll();

            if (!getInTouch.length) {
                return this.sendBadRequestResponse(res, "Record not found.", getInTouch);
            }

            return this.sendOkResponse(res, "Get successfully.", getInTouch);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error fetching get in touch.");
        }
    };
}