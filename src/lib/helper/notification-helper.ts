import Notification from '$lib/components/notification.svelte';
import { mount, unmount } from 'svelte';

export function showNotification(type: 'success' | 'error', message: string, duration = 3000): void {
  // Create a container element for the notification
  const container = document.createElement('div');
  document.body.appendChild(container);

  // Mount the Notification component
  const notification = mount(Notification, {
    target: container,
    props: { type, message, duration }
  });

  // Remove the notification after the specified duration plus a small buffer
  setTimeout(() => {
    unmount(notification);
    document.body.removeChild(container);
  }, duration + 100);
}
