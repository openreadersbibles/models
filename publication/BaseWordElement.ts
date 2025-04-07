import { PublicationRequest } from "../../models/PublicationRequest";
import { PublicationWord } from "./PublicationWord";

export class BaseWordElement<T> {
    row: T;
    request: PublicationRequest;
    word: PublicationWord;

    constructor(obj: T, word: PublicationWord, request: PublicationRequest) {
        this.row = obj;
        this.word = word;
        this.request = request;
    }

}