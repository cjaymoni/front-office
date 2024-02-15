import { IComment } from "../../crm/comments/commentsApiRequests";
import { IBriefLitigation } from "../briefs-litigation/briefsLitigationApiRequests";

export interface ITrials {
  id: string;
  litigation_id: string;
  court: string;
  judge: string;
  notes: string;
  comment: IComment;
  date: string;
  next_hearing_date: string;
  litigation: IBriefLitigation;
}
