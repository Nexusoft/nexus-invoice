import AddEditInvoiceForm from './AddEditInvoiceForm';

import { removeDraftToEdit, deleteDraft } from 'lib/invoiceDrafts';

const {
  libraries: {
    React: { useState, useEffect },
    ReactRedux: { useSelector, useDispatch },
  },
  components: { Icon, Modal, Button },
  utilities: { confirm },
} = NEXUS;

const __ = (input) => input;

const DangerButtonStyle = {
  border: 'none',
  boxShadow: 'none',
};

export default function InvoiceModal({ removeModal }) {
  const draftToEditBool = useSelector((state) => !!state.ui.draftEdit);
  const dispatch = useDispatch();
  const [isDraft, setIsDraft] = useState(false);
  useEffect(() => {
    if (draftToEditBool) {
      setIsDraft(true);
      dispatch(removeDraftToEdit());
    }
  }, []);

  const removeDraft = async () => {
    const result = await confirm({
      question: __('Do you want to delete this draft invoice?'),
      note: __('This can not be undone'),
    });
    if (result) {
      dispatch(deleteDraft());
    }
  };

  return (
    <Modal
      visible={true}
      removeModal={removeModal}
      style={{
        width: '90%',
        maxHeight: '90%',
        height: '90%',
        // animation: 'none',
      }}
    >
      <Modal.Header>
        <div
          style={{
            display: 'inline',
            left: '0%',
            position: 'absolute',
            top: '0%',
            marginTop: '.25em',
            marginLeft: '.25em',
          }}
        >
          <Button
            skin={'plain'}
            style={DangerButtonStyle}
            onClick={removeModal}
          >
            ×
          </Button>
        </div>
        {isDraft ? 'Edit Draft Invoice' : 'New Invoice'}{' '}
        {isDraft && (
          <div
            style={{
              display: 'inline',
              right: '0%',
              position: 'absolute',
              top: '0%',
              marginTop: '.25em',
            }}
          >
            <Button
              square
              skin={'plain'}
              style={DangerButtonStyle}
              onClick={() => {
                removeDraft();
              }}
            >
              {' '}
              <Icon
                icon={{ url: 'icons/trash.svg', id: 'icon' }}
                style={{
                  fontSize: '.8em',
                  opacity: 0.7,
                  overflow: 'visible',
                  marginRight: '0.25em',
                }}
              />
            </Button>
          </div>
        )}
      </Modal.Header>
      <Modal.Body>
        <AddEditInvoiceForm
          removeModal={removeModal}
          username={username}
          formInitialValues
        />
      </Modal.Body>
    </Modal>
  );
}