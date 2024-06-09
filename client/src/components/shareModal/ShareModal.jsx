import { Modal, useMantineTheme } from "@mantine/core";
import PostShare from "../postShare/PostShare";
import "./ShareModal.css";
function ShareModal({ modalOpened, setModalOpened }) {
	return (
		<Modal
			opened={modalOpened}
			onClose={() => setModalOpened(false)}
			closeButtonProps={{
				color: "pink",
			}}
			centered
			ml="-5%"
			overlayProps={{
				opacity: 0.55,
				blur: 3,
			}}
			title={<div className="modalTitle">Add new News</div>}
		>
			<PostShare setModalOpened={setModalOpened} />
		</Modal>
	);
}

export default ShareModal;
