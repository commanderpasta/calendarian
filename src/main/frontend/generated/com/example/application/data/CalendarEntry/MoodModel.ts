import { _enum as _enum_1, EnumModel as EnumModel_1, makeEnumEmptyValueCreator as makeEnumEmptyValueCreator_1 } from "@vaadin/hilla-lit-form";
import Mood_1 from "./Mood.js";
class MoodModel extends EnumModel_1<typeof Mood_1> {
    static override createEmptyValue = makeEnumEmptyValueCreator_1(MoodModel);
    readonly [_enum_1] = Mood_1;
}
export default MoodModel;
