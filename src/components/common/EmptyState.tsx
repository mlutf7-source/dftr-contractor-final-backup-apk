type Props = {
    text?: string;
    };

    export default function EmptyState({
      text = 'لا توجد بيانات حالياً',
      }: Props) {
        return (
            <div className="card empty-state">
                  {text}
                      </div>
                        );
                        }
