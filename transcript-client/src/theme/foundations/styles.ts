export const styles = {
  global: (props: any) => ({
    body: {
      bg: props.colorMode === 'dark' ? '#1a1a1a' : 'gray.200',
    },
  }),
} as const