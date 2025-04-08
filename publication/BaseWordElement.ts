import { PublicationRequest } from "../../models/PublicationRequest.js";
import { PublicationWord } from "./PublicationWord.js";

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