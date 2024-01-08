import { useNavigate } from "react-router-native";
import ValidateReviewForm from "./ValidateReviewForm";
import { useCreateReview } from "../../hooks/useCreateReview";

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repositoryOwnerName, repositoryName, rating, review } = values;

    try {
      const { data } = await createReview({
        repositoryOwnerName,
        repositoryName,
        rating: Number(rating),
        review,
      });

      navigate(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ValidateReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
