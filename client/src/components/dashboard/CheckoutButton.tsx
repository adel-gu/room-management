import { useCheckout } from '../../hooks/bookings';
import { BookingStatus } from '../../utils/constants';
import Button from '../ui/Button';

const CheckoutButton = ({ bookingId }: { bookingId: string }) => {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      variation="primary"
      size="sm"
      onClick={() =>
        checkout({
          bookingId,
          editedData: { status: BookingStatus.CheckedOut },
        })
      }
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
};
export default CheckoutButton;
