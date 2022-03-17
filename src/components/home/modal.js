import { Box, Button, Modal, Typography } from "@mui/material";

const ModalCustom = (props) => {

    return ( 
        <Modal
            open={props.open}
            onClose={()=>props.setOpenModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                props.title
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                props.descripcion
                </Typography>
                <Button onClick={props.action}>Continuar</Button>
                <Button variant="contained" onClick={()=>props.setOpenModal(false)}>Cancelar</Button>
            </Box>
        </Modal>
     );
}
 
export default ModalCustom;